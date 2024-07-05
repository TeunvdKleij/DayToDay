using DayToDay.Controllers;
using DayToDay.Data;
using DayToDay.Models;
using DayToDay.Models.DTO;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DayToDay.Controllers;
using Serilog;

namespace DayToDay.Services;

public class GroupService
{
    private readonly DataContext _dataContext;

    public GroupService(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<IActionResult> GetGroups(string userId)
    {
        var res = await _dataContext.Group
            .Where(i => i.UserId == userId)
            .Select(i => i.Name)
            .ToListAsync();
        if (res == null)
        {
            LogService.WarningLog(nameof(GroupController), nameof(GetGroups), "No group found");
            return new BadRequestObjectResult(new {showAddGroup = true});
        }
        return new OkObjectResult(new { groups = res });
    }
    public async Task<IActionResult> GetGroupsAfterAddingGroup(GroupDTO groupDto, string userId)
    {
        string groupName = ValidationService.ReplaceHTML(groupDto.Name);
        if (string.IsNullOrEmpty(groupName) || groupName.Length > 20) 
            return new BadRequestObjectResult(new{});
        var groups = await _dataContext.Group.Where(i => i.UserId == userId).Select(i => i.Name).ToListAsync();
        if (groups.Contains(groupName)) return new BadRequestObjectResult(new{});
        
        AddGroup(groupName, userId);
        
        return await GetGroups(userId);
    }

    public async void AddGroup(string groupName, string userId)
    {
        GroupModel newGroup = new GroupModel
        {
            Name = groupName,
            UserId = userId
        };
        await _dataContext.Group.AddAsync(newGroup);
        await _dataContext.SaveChangesAsync();
    }

    public async Task<IActionResult> RemoveGroup(GroupDTO groupDto, string userId)
    {
        GroupModel? group = await _dataContext.Group
            .Where(i => i.Name == groupDto.Name && i.UserId == userId)
            .FirstOrDefaultAsync();
        if (group == null)
        {
            LogService.WarningLog(nameof(GroupController), nameof(RemoveGroup), "No group found");
            return new BadRequestObjectResult("No group found");
        }
        _dataContext.Group.Remove(group);
        await _dataContext.SaveChangesAsync();
        return new OkObjectResult(new { status = 200, message = "Removed all from group " + groupDto.Name });
    }
}