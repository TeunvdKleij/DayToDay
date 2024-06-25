using DayToDay.Controllers;
using DayToDay.Data;
using DayToDay.Models;
using DayToDay.Models.DTO;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using quadconnects.Controllers;
using Serilog;

namespace DayToDay.Services;

public class NoteService
{
    private readonly DataContext _dataContext;

    public NoteService(DataContext dataContext)
    {
        _dataContext = dataContext;
    }

    public async Task<OkObjectResult> GetNoteForADay(NoteDTO noteDto)
    {
        int groupID = await _dataContext.Group.Where(i => i.Name == noteDto.GroupName).Select(i => i.Id).FirstOrDefaultAsync();
        if (groupID == null)
        {
            LogService.WarningLog(nameof(NoteController), nameof(GetNoteForADay), "No group found");
            return new OkObjectResult(new {status = 204, groupID = 9999999});
        }
        DateTime date = DateTime.Now.Date.AddDays((double)noteDto.ChangedDate);
        NoteModel? dayNote = await _dataContext.Notes.Where(i => i.dateAdded == date && i.GroupId == groupID).FirstOrDefaultAsync();
        if(dayNote != null) return new OkObjectResult(new { status = 200, note = dayNote,  name = noteDto.GroupName});
        return new OkObjectResult(new {status = 204});
    }

    public async Task<IActionResult> UpdateNote(NoteDTO noteDto)
    {
        int groupID = await _dataContext.Group.Where(i => i.Name == noteDto.GroupName).Select(i => i.Id).FirstOrDefaultAsync();
        if (groupID == null)
        {
            LogService.ErrorLog(nameof(NoteController), nameof(UpdateNote), "No group found");
            return new BadRequestObjectResult("No group found");
        }
        DateTime date = DateTime.Now.Date.AddDays((double)noteDto.ChangedDate);
        NoteModel? dayNote = await _dataContext.Notes.Where(i => i.dateAdded == date && i.GroupId == groupID).FirstOrDefaultAsync();
        if (dayNote == null)
        {
            NoteModel newNote = await noteDto.AddNote(_dataContext);
            return new OkObjectResult(new {note = newNote, noteText = noteDto.NoteText});
        }
        if (string.IsNullOrEmpty(noteDto.NoteText)) return await ProcessRemoveNote(dayNote);
        return await ProcessUpdateNote(dayNote, noteDto);
    }
    

    public async Task<IActionResult> RemoveNote(NoteDTO noteDto)
    {
        int groupID = await _dataContext.Group.Where(i => i.Name == noteDto.GroupName).Select(i => i.Id).FirstOrDefaultAsync();
        if (groupID == null)
        {
            LogService.ErrorLog(nameof(NoteController), nameof(RemoveNote)+"ByGroup", "No group found");
            return new BadRequestObjectResult("No group found");
        }
        var notes = await _dataContext.Notes.Where(i => i.GroupId == groupID).ToListAsync();
        if (notes.Count == 0) LogService.WarningLog(nameof(NoteController), nameof(RemoveNote)+"ByGroup", "No notes found");
        
        foreach (var item in notes) _dataContext.Notes.Remove(item);
        await _dataContext.SaveChangesAsync();
        
        LogService.InformationLog(nameof(NoteController), nameof(RemoveNote)+"ByGroup", "Removed all notes from group");
        return new OkObjectResult(new { status = 200, message = "Removed all from group " + noteDto.GroupName });
    }
    
    private async Task<IActionResult> ProcessUpdateNote(NoteModel item, NoteDTO noteDto)
    {
        item.NoteText = noteDto.NoteText;
        _dataContext.Notes.Update(item);
        await _dataContext.SaveChangesAsync();
        return new OkObjectResult(new { status = 200, note = item });
    }
    
    private async Task<IActionResult> ProcessRemoveNote(NoteModel item)
    {
        _dataContext.Notes.Remove(item);
        await _dataContext.SaveChangesAsync();
        LogService.WarningLog(nameof(NoteController), nameof(UpdateNote), "Note empty");
        return new OkObjectResult(new { status = 204});
    }
    

}