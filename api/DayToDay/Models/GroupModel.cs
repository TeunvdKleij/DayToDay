using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DayToDay.Models;

public class GroupModel
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    
    public string UserId { get; set; }
    
    [ForeignKey("UserId")]
    public UserModel User { get; set; }
    
    public ICollection<NoteModel> Notes { get; set; }
    public ICollection<TaskModel> Tasks { get; set; }
}