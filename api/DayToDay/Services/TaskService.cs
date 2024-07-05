using System.Globalization;
using DayToDay.Controllers;
using DayToDay.Data;
using DayToDay.Models;
using DayToDay.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DayToDay.Controllers;

namespace DayToDay.Services;

public class TaskService
{
    private readonly DataContext _dataContext;

    public TaskService(DataContext dataContext) { _dataContext = dataContext; }

    public async Task<IActionResult> GetTasksForADay(TaskDTO taskDto, string userId)
    {
        SetTasksToCurrentDate(userId);
        var groupID = await _dataContext.Group.Where(i => i.Name == taskDto.GroupName && i.UserId == userId).Select(i => i.Id).FirstOrDefaultAsync();
        DateTime date = DateTime.Now.AddDays((double)taskDto.ChangedDate);

        var taskList = await _dataContext.Tasks.Where(i => i.dateAdded == date.Date && i.GroupId == groupID)
            .ToListAsync();
        return new OkObjectResult(new { tasks = taskList });
    }

    public async void SetTasksToCurrentDate(string userId)
    {
        var userGroups = await _dataContext.Group.Where(i => i.UserId == userId).Select(i => i.Id).ToListAsync();
        if (userGroups.Count > 0)
        {
            var oldTasks = await _dataContext.Tasks
                .Where(i => i.dateAdded < DateTime.Now.Date && !i.Done && userGroups.Contains(i.GroupId)).ToListAsync();
            if (oldTasks.Count > 0)
            {
                foreach (TaskModel task in oldTasks)
                {
                    task.dateAdded = DateTime.Now.Date;
                    _dataContext.Tasks.Update(task);
                    await _dataContext.SaveChangesAsync();
                }
            }
        }
    }

    public async Task<IActionResult> GetTasksForAGroup(TaskDTO taskDto, string userId)
    {
        var groupID = await _dataContext.Group.Where(i => i.Name == taskDto.GroupName && i.UserId == userId)
            .Select(i => i.Id).FirstOrDefaultAsync();
        var tasks = await _dataContext.Tasks.Where(i => i.GroupId == groupID).ToListAsync();
        return new OkObjectResult(new { tasks = tasks });
    }

    public async Task<IActionResult> UpdateTaskDate(TaskDTO updateTask, string userId)
    {
        TaskModel? task = await _dataContext.Tasks.FirstOrDefaultAsync(i => i.TaskId == updateTask.Id.ToString());
        if (task == null)
        {
            LogService.ErrorLog(nameof(TaskController), nameof(UpdateTaskDate), "No task found");
            return new BadRequestObjectResult("No task found");
        }

        return await ProcessTaskDateUpdate(updateTask, task);
    }

    private async Task<IActionResult> ProcessTaskDateUpdate(TaskDTO updateTask, TaskModel task)
    {
        DateTime dateTime;
        if (DateTime.TryParseExact(updateTask.Date, "MM/dd/yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None,
                out dateTime))
        {
            string formattedDateTime = dateTime.ToString("yyyy/MM/dd 00:00:00");
            task.dateAdded = DateTime.Parse(formattedDateTime);
            _dataContext.Update(task);
            await _dataContext.SaveChangesAsync();
            return new OkObjectResult(new { message = task.dateAdded });
        }

        return new BadRequestObjectResult(new { message = "Bad request" });
    }

    public async Task<IActionResult> UpdateTaskStatus(TaskDTO updateTask)
    {
        TaskModel task = await _dataContext.Tasks.FirstOrDefaultAsync(i => i.TaskId == updateTask.Id.ToString());
        if (task == null)
        {
            LogService.ErrorLog(nameof(TaskController), nameof(UpdateTaskStatus), "No task found");
            return new BadRequestObjectResult("No task found");
        }

        task.Done = (bool)updateTask.Done;
        _dataContext.Update(task);
        await _dataContext.SaveChangesAsync();
        return new OkObjectResult(new { message = task.Done });
    }

    public async Task<IActionResult> UpdateTaskValue(TaskDTO updateTask)
    {
        TaskModel task = await _dataContext.Tasks.FirstOrDefaultAsync(i => i.TaskId == updateTask.Id.ToString());
        if (task == null)
        {
            LogService.ErrorLog(nameof(TaskController), nameof(UpdateTaskValue), "No task found");
            return new BadRequestObjectResult("No task found");
        }

        string taskName = ValidationService.ReplaceHTML((string)updateTask.TaskName);
        task.TaskName = taskName;
        _dataContext.Update(task);
        await _dataContext.SaveChangesAsync();
        return new OkObjectResult(new { message = taskName });
    }

    public async Task<IActionResult> AddTask(TaskDTO task, string userId)
    {
        if (task.ChangedDate < 0)
        {
            LogService.ErrorLog(nameof(TaskController), nameof(AddTask), "Date selected before current day");
            return new BadRequestObjectResult("Date selected before current day");
        }
        
        var taskIds = new HashSet<int>();
        int taskId = 0;
        var tasks = await _dataContext.Tasks.OrderBy(i => i.TaskId).ToListAsync();
        if (tasks == null)
        {
            LogService.WarningLog(nameof(TaskController), nameof(AddTask), "No task found, new taskId = 0");
            taskId = 0;
        }

        for (int i = 0; i < tasks.Count; i++) taskIds.Add(int.Parse(tasks[i].TaskId));
        for (int i = 0; i < taskIds.Count; i++)
        {
            if (!taskIds.Contains(i))
            {
                taskId = i;
                break;
            }

            if (i + 1 == taskIds.Count) taskId = i + 1;
        }
        if (task.GroupName == null)
        {
            LogService.ErrorLog(nameof(TaskController), nameof(AddTask), "No groupName provided");
            return new BadRequestObjectResult("No groupName provided");
        }
        if (task.ChangedDate == null)
        { 
            LogService.ErrorLog(nameof(TaskController), nameof(AddTask), "No changedDate provided");
            return new BadRequestObjectResult("No changedDate provided");
        }
        int groupId = await _dataContext.Group.Where(i => i.Name == task.GroupName && i.UserId == userId).Select(i => i.Id).FirstOrDefaultAsync();
        if (groupId == null)
        {
            LogService.ErrorLog(nameof(TaskController), nameof(AddTask), "No groupId found");
            return new BadRequestObjectResult("No groupId found");
        }

        string taskValue = ValidationService.ReplaceHTML(task.TaskName);
        ProcessAddTask(task, taskValue,taskId,groupId);
        return new OkObjectResult(new { id = taskId });
    }

    public async void ProcessAddTask(TaskDTO task, string taskValue, int taskId, int groupId)
    {
        
        TaskModel newTask = new TaskModel
        {
            TaskId = taskId.ToString(),
            TaskName = taskValue,
            Done = false,
            dateAdded = DateTime.Now.Date.AddDays((double)task.ChangedDate),
            GroupId = groupId
        };
        await _dataContext.Tasks.AddAsync(newTask);
        await _dataContext.SaveChangesAsync();
    }

    public async Task<IActionResult> RemoveTask(TaskDTO removeTask)
    {
        TaskModel task = await _dataContext.Tasks.FirstOrDefaultAsync(i => i.TaskId == removeTask.Id.ToString());
        _dataContext.Remove(task);
        await _dataContext.SaveChangesAsync();
        return new OkObjectResult("Task removed succesfully");
    }

    public async Task<IActionResult> RemoveTasksByGroup(TaskDTO taskDto, string userId)
    {
        int groupID = await _dataContext.Group.Where(i => i.Name == taskDto.GroupName && i.UserId == userId).Select(i => i.Id).FirstOrDefaultAsync();
        if (groupID == null)
        {
            LogService.ErrorLog(nameof(TaskController), nameof(RemoveTasksByGroup), "No group found");
            return  new BadRequestObjectResult("No group found");
        }
        var tasks = await _dataContext.Tasks.Where(i => i.GroupId == groupID).ToListAsync();
        foreach (var item in tasks) _dataContext.Tasks.Remove(item);
        await _dataContext.SaveChangesAsync();
        return new OkObjectResult(new { status = 200, message = "Removed all from group " + taskDto.GroupName });
    }
}