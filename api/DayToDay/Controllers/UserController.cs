using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DayToDay.Data;
using DayToDay.Models;
using DayToDay.Models.DTO;
using DayToDay.Models.DTO.User;
using DayToDay.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using quadconnects.Controllers;
using Serilog;

namespace DayToDay.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : BaseController
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost("Register")]
    public async Task<IActionResult> RegisterUser(RegisterDTO model)
    {
        return await _userService.Register(model);
    }
    [HttpPost("Login")]
    public async Task<IActionResult> LoginUser([FromBody] LoginDTO model)
    {
        return await _userService.Login(model);
    }
    
    [HttpGet("Settings")]
    public async Task<IActionResult> GetSettings()
    {
        var userID = GetUserIDFromToken();
        if (userID == null)
        {
             LogService.ErrorLog(nameof(UserController), nameof(GetSettings), "No user found");
             return new BadRequestObjectResult("No user found");
        }
        
        return await _userService.GetSettings(userID);
    }
    
    [HttpPost("Settings/Change")]
    public async Task<IActionResult> ChangeSettings(SettingsDTO settings)
    {
        Log.Information("COLOR: " + settings.Color);
        var userID = GetUserIDFromToken();
        if (userID == null)
        {
            LogService.ErrorLog(nameof(UserController), nameof(GetSettings), "No user found");
            return new BadRequestObjectResult("No user found");
        }
        return await _userService.ChangeSettings(userID, settings);
    }
    
    
    
    
    
    
    
    
}