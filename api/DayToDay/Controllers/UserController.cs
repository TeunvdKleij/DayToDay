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
using Serilog;

namespace DayToDay.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
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
    
    
    
    
    
    
}