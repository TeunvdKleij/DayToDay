using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace DayToDay.Models.DTO.User;

public class RegisterDTO
{
    [EmailAddress]
    [MinLength(1)]
    [MaxLength(80)]
    [Required(ErrorMessage = "Email is required")]
    public string? Email { get; set; }

    [MinLength(8)]
    [MaxLength(128)]
    [DataType(DataType.Password)]
    [Password(RequireDigit = true, RequireLowercase = true, RequireNonAlphanumeric = true, RequireUppercase = true, RequiredUniqueChars = 1)]
    [Required(ErrorMessage = "Password is required")]
    public string? Password { get; set; }
    
    [MinLength(8)]
    [MaxLength(128)]
    [DataType(DataType.Password)]
    [Password(RequireDigit = true, RequireLowercase = true, RequireNonAlphanumeric = true, RequireUppercase = true, RequiredUniqueChars = 1)]
    [Required(ErrorMessage = "Repeated Password is required")]
    public string? RepeatedPassword { get; set; }
    public void SanitizeHTML()
    {
        Email = SanitizeHTML(Email);
        Password = SanitizeHTML(Password);
        RepeatedPassword = SanitizeHTML(RepeatedPassword);
    }
    private string SanitizeHTML(string inputValue)
    {
        string sanitizedText = inputValue;
        if (!string.IsNullOrEmpty(inputValue))
        {
            string regex = $@"/(<|>|[*';"":]|select|delete|update|execute|insert)/";
            sanitizedText = Regex.Replace(inputValue, regex, string.Empty, RegexOptions.IgnoreCase);
        }
        return sanitizedText;
    }
}