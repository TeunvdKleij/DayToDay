using DayToDay.Data;
using Serilog;

namespace DayToDay.Services;

public static class LogService
{

    public static void InformationLog(string controllerName, string methodName, string notice)
    {
        Log.Information("Controller: " + controllerName + " | " + methodName + " | " +notice);
    }
    public static void ErrorLog(string controllerName, string methodName, string notice)
    {
        Log.Error("Controller: " + controllerName + " | " + methodName + " | " +notice);
    }
    public static void WarningLog(string controllerName, string methodName, string notice)
    {
        Log.Warning("Controller: " + controllerName + " | " + methodName + " | " +notice);
    }
}