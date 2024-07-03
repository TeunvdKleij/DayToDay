using System.Drawing;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DayToDay.Controllers;
using DayToDay.Data;
using DayToDay.Models;
using DayToDay.Models.DTO.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using quadconnects.Controllers;
using Serilog;

namespace DayToDay.Services;

public class UserService
{
    private readonly UserManager<UserModel> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;
    private readonly DataContext _dataContext;
    public UserService(UserManager<UserModel> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, DataContext dataContext)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
        _dataContext = dataContext;
    }
    public async Task<IActionResult> Register(RegisterDTO model)
    {
        model.SanitizeHTML();
        if (!model.Password.Equals(model.RepeatedPassword))
        {
            LogService.ErrorLog("User", nameof(Register), "Passwords don't match");
            return new BadRequestObjectResult("Passwords don't match");
        }
        if (model == null)
        {
            LogService.ErrorLog("User", nameof(Register), "Model is empty");
            return new BadRequestObjectResult("Model is empty");
        }

        var userExistsEmail = await _userManager.FindByEmailAsync(model.Email);
        if (userExistsEmail != null)
        {
            LogService.ErrorLog("User", nameof(Register), "User with email exist");
            return new BadRequestObjectResult(new { Status = "Error", Message = "User already exists!" });
        }
        UserModel user = new()
        {
            Email = model.Email,
            UserName = model.Email,
            SecurityStamp = Guid.NewGuid().ToString(),
            ColorCode = "#1755de",
            AddTaskLeft = false,
            CompleteTaskLeft = false
            
        };
        var result = await _userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded)
        {
            LogService.ErrorLog("User", nameof(Register), "Couldn't create user");
            return new BadRequestObjectResult(new
            {
                Status = "Error", Message = "User creation failed! Please check user details and try again."
            });
        }

        if (!await _roleManager.RoleExistsAsync(UserRoles.User))
            await _roleManager.CreateAsync(new IdentityRole(UserRoles.User));
        if (await _roleManager.RoleExistsAsync(UserRoles.User))
            await _userManager.AddToRoleAsync(user, UserRoles.User);
        var userRoles = await _userManager.GetRolesAsync(user);
        var authClaims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),

        };
        foreach (var userRole in userRoles)
        {
            authClaims.Add(new Claim(ClaimTypes.Role, userRole));
        }
        var token = SetToken(authClaims);

        var settings = new
        {
            color = "#1755de",
            addTaskLeft = false,
            completeTaskLeft = false
        };
        LogService.InformationLog("User", nameof(Register), "Created user successfully with email: " + model.Email);
        return new OkObjectResult(new
        {
            Status = 200,
            Message = "User created successfully!",
            token = new JwtSecurityTokenHandler().WriteToken(token),
            expiration = DateTime.UtcNow.AddHours(3),
            settings = settings
        });
    }

    public async Task<IActionResult> Login (LoginDTO model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
        {
            LogService.InformationLog("User", nameof(Login), "User with the correct password found");
            var userRoles = await _userManager.GetRolesAsync(user);
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
    
            var userData = new
            {
                id = user.Id,
                email = user.Email,
            };
            var token = SetToken(authClaims);
            var settings = await _dataContext.Users.Where(i => i.Id == user.Id)
                .Select(i => new { i.ColorCode, i.AddTaskLeft, i.CompleteTaskLeft }).FirstOrDefaultAsync();
            if (settings == null)
            {
                LogService.ErrorLog(nameof(UserController), nameof(Login), "No settings found");
                return new BadRequestObjectResult("No settings found");
            }
            LogService.InformationLog("User", nameof(Login), "Signed in successfully with: " + model.Email);
            return new OkObjectResult(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = DateTime.UtcNow.AddHours(3),
                user = userData,
                settings = settings
            });
        }
        return new UnauthorizedObjectResult(new {status = 401, message = "unauthorized"});

    }
    
    public async Task<IActionResult> GetSettings (string id)
    {
        
        var res = await _dataContext.Users.Where(i => i.Id == id).Select(i => new { color = i.ColorCode, addTaskLeft = i.AddTaskLeft, completeTaskLeft = i.CompleteTaskLeft })
            .FirstOrDefaultAsync();
        if(res == null) 
        {
            LogService.WarningLog(nameof(UserController), nameof(GetSettings), "No settings or user found");
            return new BadRequestObjectResult(new {showAddGroup = true});
        }
        return new OkObjectResult(res);
    }
    private JwtSecurityToken SetToken(List<Claim> authClaims) {
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("3ECD5EEE-DA7F-4B32-B092-F9D8D4F0BDCA"));
        
        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.UtcNow.AddHours(3),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );
        
        return token;
    }

    public async Task<IActionResult> ChangeSettings(string userID, SettingsDTO settings)
    {
        var settingsOld = await _dataContext.Users.Where(i => i.Id == userID).FirstOrDefaultAsync();
        if (settings.AddTaskLeft != null) settingsOld.AddTaskLeft = (bool)settings.AddTaskLeft;
        if (settings.Color != null) settingsOld.ColorCode = settings.Color;
        if (settings.CompleteTaskLeft != null) settingsOld.CompleteTaskLeft = (bool)settings.CompleteTaskLeft;

        _dataContext.Users.Update(settingsOld);
        await _dataContext.SaveChangesAsync();
        return new OkObjectResult("Successs");
    }
    
}