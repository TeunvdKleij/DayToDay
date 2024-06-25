using Microsoft.AspNetCore.Identity;

namespace DayToDay.Models;

public class UserModel: IdentityUser
{
    public string ColorCode { get; set; }
    public bool HasPremium { get; set; }
    public bool AddTaskLeft { get; set; }
    public bool CompleteTaskLeft { get; set; }
    public ICollection<GroupModel> Groups { get; set; }
}