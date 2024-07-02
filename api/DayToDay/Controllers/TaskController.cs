using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices.JavaScript;
using DayToDay.Data;
using DayToDay.Models;
using DayToDay.Models.DTO;
using DayToDay.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using quadconnects.Controllers;

namespace DayToDay.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TaskController : BaseController
{
    private readonly TaskService _taskService;
    public TaskController(TaskService taskService)
    {
        _taskService = taskService;
    }
    
    [HttpPost("TasksForADay")]
    public async Task<IActionResult> GetTasksForADay([FromBody] TaskDTO taskDto)
    {
        var userId = GetUserIDFromToken();
        if (userId == null)
        {
            LogService.ErrorLog(nameof(GroupController), nameof(GetTasksForADay), "No user found");
            return Unauthorized(new {status = 401, message = "Unauthorized get tasks for a day"});
        }
        return await _taskService.GetTasksForADay(taskDto, userId);
    }

    [HttpPost("TasksForAGroup")]
    public async Task<IActionResult> GetTasksForAGroup([FromBody] TaskDTO taskDto)
    {
        var userId = GetUserIDFromToken();
        if (userId == null)
        {
            LogService.ErrorLog(nameof(GroupController), nameof(GetTasksForAGroup), "No user found");
            return Unauthorized(new {status = 401, message = "Unauthorized get tasks for a group"});
        }
        return await _taskService.GetTasksForAGroup(taskDto, userId);
    }
    
    [HttpPut("UpdateTaskDate")]
    public async Task<IActionResult> UpdateTaskDate([FromBody] TaskDTO updateTask)
    {
        var userId = GetUserIDFromToken();
        if (userId == null)
        {
            LogService.ErrorLog(nameof(GroupController), nameof(UpdateTaskDate), "No user found");
            return Unauthorized(new {status = 401, message = "Unauthorized update task date"});
        }
        return await _taskService.UpdateTaskDate(updateTask, userId);
    }
    [HttpPut("UpdateTaskStatus")]
    public async Task<IActionResult> UpdateTaskStatus([FromBody] TaskDTO updateTask)
    {
        var userId = GetUserIDFromToken();
        if (userId == null)
        {
            LogService.ErrorLog(nameof(GroupController), nameof(UpdateTaskStatus), "No user found");
            return Unauthorized(new {status = 401, message = "Unauthorized update task status"});
        }
        return await _taskService.UpdateTaskStatus(updateTask);
    }
    
    [HttpPut("UpdateTaskValue")]
    public async Task<IActionResult> UpdateTaskValue([FromBody] TaskDTO updateTask)
    {
        var userId = GetUserIDFromToken();
        if (userId == null)
        {
            LogService.ErrorLog(nameof(GroupController), nameof(UpdateTaskValue), "No user found");
            return Unauthorized(new {status = 401, message = "Unauthorized update task value"});
        }
        return await _taskService.UpdateTaskValue(updateTask);
    }

    [HttpPost("AddTask")]
    public async Task<IActionResult> AddTask([FromBody] TaskDTO task)
    {
        var userId = GetUserIDFromToken();
        if (userId == null)
        {
            LogService.ErrorLog(nameof(GroupController), nameof(AddTask), "No user found");
            return Unauthorized(new {status = 401, message = "Unauthorized add task"});
        }
        return await _taskService.AddTask(task, userId);
    }
    
    [HttpPost("RemoveTask")]
    public async Task<IActionResult> RemoveTask([FromBody] TaskDTO removeTask)
    {
        var userId = GetUserIDFromToken();
        if (userId == null)
        {
            LogService.ErrorLog(nameof(GroupController), nameof(RemoveTask), "No user found");
            return Unauthorized(new {status = 401, message = "Unauthorized remove task"});
        }
        return await _taskService.RemoveTask(removeTask);
    }

    [HttpPost("RemoveTasksByGroup")]
    public async Task<IActionResult> RemoveTasksByGroup([FromBody] TaskDTO taskDto)
    {
        var userId = GetUserIDFromToken();
        if (userId == null)
        {
            LogService.ErrorLog(nameof(GroupController), nameof(RemoveTasksByGroup), "No user found");
            return Unauthorized(new {status = 401, message = "Unauthorized remove tasks by group"});
        }
        return await _taskService.RemoveTasksByGroup(taskDto, userId);
    }
}