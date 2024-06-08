using DayToDay.Controllers;
using DayToDay.Data;
using DayToDay.Models;
using DayToDay.Models.DTO;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DayToDay.Services;

public class GroupService
{
    private readonly DataContext _dataContext;
    private readonly LogService _logService;
    private readonly ValidationService _validationService;

    public GroupService(DataContext dataContext, LogService logService, ValidationService validationService)
    {
        _logService = logService;
        _dataContext = dataContext;
        _validationService = validationService;
    }

    public async Task<IActionResult> GetGroups()
    {
        var res = await _dataContext.Group.Select(i => i.Name).ToListAsync();
        if (res == null)
        {
            _logService.WarningLog(nameof(GroupController), nameof(GetGroups), "No group found");
            return new BadRequestObjectResult(new {showAddGroup = true});
        }
        return new OkObjectResult(new { groups = res });
    }
    public async Task<IActionResult> GetGroupsAfterAddingGroup(GroupDTO groupDto)
    {
        string groupName = _validationService.replaceHTML(groupDto.Name);
        if (string.IsNullOrEmpty(groupName) || groupName.Length > 20) 
            return new BadRequestObjectResult(new{});
        var groups = await _dataContext.Group.Select(i => i.Name).ToListAsync();
        if (groups.Contains(groupName)) return new BadRequestObjectResult(new{});
        
        AddGroup(groupName);
        
        return await GetGroups();
    }

    public async void AddGroup(string groupName)
    {
        GroupModel newGroup = new GroupModel
        {
            Name = groupName
        };
        await _dataContext.Group.AddAsync(newGroup);
        await _dataContext.SaveChangesAsync();
    }

    public async Task<IActionResult> RemoveGroup(GroupDTO groupDto)
    {
        GroupModel group = await _dataContext.Group.Where(i => i.Name == groupDto.Name).FirstOrDefaultAsync();
        _dataContext.Group.Remove(group);
        await _dataContext.SaveChangesAsync();
        return new OkObjectResult(new { status = 200, message = "Removed all from group " + groupDto.Name });
    }
}