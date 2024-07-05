using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices.JavaScript;
using DayToDay.Data;
using DayToDay.Models;
using DayToDay.Models.DTO;
using DayToDay.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DayToDay.Controllers;
using Serilog;

namespace DayToDay.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NoteController : BaseController
{
    private readonly NoteService _noteService;
    public NoteController(NoteService noteService)
    {
        _noteService = noteService;
    }
    
    [HttpPost("NoteForADay")]
    public async Task<IActionResult> GetNoteForADay([FromBody] NoteDTO noteDto)
    {
        var userId = GetUserIDFromToken();
        if (userId == null)
        {
            LogService.ErrorLog(nameof(GroupController), nameof(GetNoteForADay), "No user found");
            return Unauthorized(new {status = 401, message = "Unauthorized get note for a day"});
        }
        return await _noteService.GetNoteForADay(noteDto, userId);
    }
    
    [HttpPost("UpdateNote")]
    public async Task<IActionResult> UpdateNote([FromBody] NoteDTO noteDto)
    {
        var userId = GetUserIDFromToken();
        if (userId == null)
        {
            LogService.ErrorLog(nameof(GroupController), nameof(UpdateNote), "No user found");
            return Unauthorized(new {status = 401, message = "Unauthorized update note"});
        }
        return await _noteService.UpdateNote(noteDto, userId);
    }
    [HttpPost("RemoveNotesByGroup")]
    public async Task<IActionResult> RemoveNotesByGroup([FromBody] NoteDTO noteDto)
    {
        var userId = GetUserIDFromToken();
        if (userId == null)
        {
            LogService.ErrorLog(nameof(GroupController), nameof(RemoveNotesByGroup), "No user found");
            return Unauthorized(new {status = 401, message = "Unauthorized remove notes by group"});
        }
        return await _noteService.RemoveNote(noteDto, userId);
    }
    
}