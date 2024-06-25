using DayToDay.Data;
using DayToDay.Models;
using DayToDay.Models.DTO;
using DayToDay.Services;
using Microsoft.AspNetCore.Mvc;
using quadconnects.Controllers;

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
        return await _groupService.GetGroups();
    }
    [HttpPost("AddGroup")]
    public async Task<IActionResult> AddGroup([FromBody] GroupDTO groupDto)
    {
        var userId = GetUserIDFromToken();
        return await _groupService.GetGroupsAfterAddingGroup(groupDto, userId);
    }
    [HttpPost("RemoveGroup")]
    public async Task<IActionResult> RemoveGroup([FromBody] GroupDTO groupDto)
    {
        var userId = GetUserIDFromToken();
        return await _groupService.RemoveGroup(groupDto);
    }
    
    
}