using System.Text.RegularExpressions;

namespace DayToDay.Services;

public static class ValidationService
{

    public static string ReplaceHTML(string input)
    {
        List<string> htmlElements = [
        "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", 
        "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", 
        "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", 
        "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "i", 
        "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map", "mark", "meta", 
        "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", 
        "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", 
        "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", 
        "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", 
        "wbr"];
        string pattern = $@"</?({string.Join("|", htmlElements)})[^>]*>";
        Regex regex = new Regex(pattern, RegexOptions.IgnoreCase | RegexOptions.Compiled);
        MatchCollection matches = regex.Matches(input);
        while (matches.Count > 0)
        {
            input = regex.Replace(input, string.Empty);
            matches = regex.Matches(input);
        }
        return input.TrimStart();
    }

}