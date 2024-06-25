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
        return await _taskService.GetTasksForADay(taskDto);
    }

    [HttpPost("TasksForAGroup")]
    public async Task<IActionResult> GetTasksForAGroup([FromBody] TaskDTO taskDto)
    {
        var userId = GetUserIDFromToken();
        return await _taskService.GetTasksForAGroup(taskDto);
    }
    
    [HttpPut("UpdateTaskDate")]
    public async Task<IActionResult> UpdateTaskDate([FromBody] TaskDTO updateTask)
    {
        var userId = GetUserIDFromToken();
        return await _taskService.UpdateTaskDate(updateTask);
    }
    [HttpPut("UpdateTaskStatus")]
    public async Task<IActionResult> UpdateTaskStatus([FromBody] TaskDTO updateTask)
    {
        var userId = GetUserIDFromToken();
        return await _taskService.UpdateTaskStatus(updateTask);
    }
    
    [HttpPut("UpdateTaskValue")]
    public async Task<IActionResult> UpdateTaskValue([FromBody] TaskDTO updateTask)
    {
        var userId = GetUserIDFromToken();
        return await _taskService.UpdateTaskValue(updateTask);
    }

    [HttpPost("AddTask")]
    public async Task<IActionResult> AddTask([FromBody] TaskDTO task)
    {
        var userId = GetUserIDFromToken();
        return await _taskService.AddTask(task);
    }
    
    [HttpPost("RemoveTask")]
    public async Task<IActionResult> RemoveTask([FromBody] TaskDTO removeTask)
    {
        var userId = GetUserIDFromToken();
        return await _taskService.RemoveTask(removeTask);
    }

    [HttpPost("RemoveTasksByGroup")]
    public async Task<IActionResult> RemoveTasksByGroup([FromBody] TaskDTO taskDto)
    {
        var userId = GetUserIDFromToken();
        return await _taskService.RemoveTasksByGroup(taskDto);
    }
}