using DayToDay.Data;
using DayToDay.Models;
using DayToDay.Models.DTO;
using DayToDay.Services;
using Microsoft.AspNetCore.Mvc;
using DayToDay.Controllers;

namespace DayToDay.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GroupController : BaseController
{
    private readonly GroupService _groupService;

    public GroupController(GroupService groupService)
    {
        _groupService = groupService;
    }

    [HttpGet("GetGroups")]
    public async Task<IActionResult> GetGroups()
    {
        var userId = GetUserIDFromToken();
        if (userId == null)
        {
            LogService.ErrorLog(nameof(GroupController), nameof(GetGroups), "No user found");
            return Unauthorized(new {status = 401, message = "Unauthorized get groups"});
        }
        return await _groupService.GetGroups(userId);
    }
    [HttpPost("AddGroup")]
    public async Task<IActionResult> AddGroup([FromBody] GroupDTO groupDto)
    {
        var userId = GetUserIDFromToken();
        if (userId == null)
        {
            LogService.ErrorLog(nameof(GroupController), nameof(AddGroup), "No user found");
            return Unauthorized(new {status = 401, message = "Unauthorized add group"});
        }
        return await _groupService.GetGroupsAfterAddingGroup(groupDto, userId);
    }
    [HttpPost("RemoveGroup")]
    public async Task<IActionResult> RemoveGroup([FromBody] GroupDTO groupDto)
    {
        var userId = GetUserIDFromToken();
        if (userId == null)
        {
            LogService.ErrorLog(nameof(GroupController), nameof(RemoveGroup), "No user found");
            return Unauthorized(new {status = 401, message = "Unauthorized remove group"});
        }
        return await _groupService.RemoveGroup(groupDto, userId);
    }
    
    
}