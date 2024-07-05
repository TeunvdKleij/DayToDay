using System.IdentityModel.Tokens.Jwt;
using DayToDay.Data;
using DayToDay.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Serilog;

namespace DayToDay.Controllers;

public class BaseController: ControllerBase
{
    protected string GetUserIDFromToken()
    {
        var jsonToken = GetJsonToken();
        if (jsonToken == null) return null;

        var roleClaim = jsonToken.Claims
            .FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");
        return roleClaim?.Value;
        
    }

    protected string GetRoleFromToken()
    {
        var jsonToken = GetJsonToken();
        if (jsonToken == null) return null;
        
        var idClaim = jsonToken.Claims
            .FirstOrDefault(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role");
        return idClaim?.Value;
    }
    protected string GetUserNameFromToken()
    {
        var jsonToken = GetJsonToken();
        if (jsonToken == null) return null;
        var nameClaim = jsonToken.Claims
            .FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name");
        return nameClaim?.Value;
    }

    private bool checkForValidToken(JwtSecurityToken jsonToken)
    {
        var expClaim = jsonToken.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Exp);
        if (expClaim == null)
        {
            Log.Error("Controller: BaseController | Method: checkForValidToken | Message: ExpClaim is null");
            return false;
        }
        if (!long.TryParse(expClaim.Value, out long expUnix))
        {
            Log.Error("Controller: BaseController | Method: checkForValidToken | Message: Parsing was not successful");
            return false;
        }
        var expirationDate = DateTimeOffset.FromUnixTimeSeconds(expUnix).DateTime;
        
        if (expirationDate <= DateTime.UtcNow)
        {
            Log.Error("Controller: BaseController | Method: checkForValidToken | Message: Token expired");
            return false;
        }

        return true;
    }
    private JwtSecurityToken GetJsonToken()
    {
        string jwtToken = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        var handler = new JwtSecurityTokenHandler();
        if (jwtToken.IsNullOrEmpty() || jwtToken == "undefined")
        {
            Log.Error("Controller: BaseController | Method: GetJsonToken | Message: Token not found");
            return null;
        }
        var jsonToken = handler.ReadToken(jwtToken) as JwtSecurityToken;
        if (jsonToken == null)
        {
            Log.Error("Controller: BaseController | Method: GetJsonToken | Message: Token not read as Security token");
            return null;
        }
        if (!checkForValidToken(jsonToken)) return null;
        return jsonToken;

    }
    
}
