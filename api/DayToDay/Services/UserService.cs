using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DayToDay.Models;
using DayToDay.Models.DTO.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Serilog;

namespace DayToDay.Services;

public class UserService
{
    private readonly UserManager<UserModel> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IConfiguration _configuration;
    public UserService(UserManager<UserModel> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
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
            ColorCode = "1B91FF"
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

        LogService.InformationLog("User", nameof(Register), "Created user successfully with email: " + model.Email);
        return new OkObjectResult(new
        {
            Status = 200,
            Message = "User created successfully!",
            token = new JwtSecurityTokenHandler().WriteToken(token),
            expiration = DateTime.UtcNow.AddHours(3),
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
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
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
            LogService.InformationLog("User", nameof(Login), "Signed in successfully with: " + model.Email);
            return new OkObjectResult(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = DateTime.UtcNow.AddHours(3),
                user = userData
            });
        }
        return new UnauthorizedObjectResult(new {status = 401, message = "unauthorized"});

    }
    private JwtSecurityToken SetToken(List<Claim> authClaims) {
        Console.WriteLine("JWT : " + System.Environment.GetEnvironmentVariable("JWT_KEY"));
        
        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("3ECD5EEE-DA7F-4B32-B092-F9D8D4F0BDCA"));
        Console.WriteLine(authSigningKey);
        Console.WriteLine(_configuration["JWT:ValidIssuer"]);
        Console.WriteLine(_configuration["JWT:ValidAudience"]);
        
        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.UtcNow.AddHours(3),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );
        
        return token;
    }
}