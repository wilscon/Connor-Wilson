using Microsoft.AspNetCore.Mvc;
using SendGrid.Helpers.Mail;
using SendGrid;

namespace Connor_Wilson.Controllers
{
    public class NeuropointController : Controller
    {
        private readonly HttpClient _httpClient;
        private string? emailAPIKEY = Environment.GetEnvironmentVariable("Website_Notification");

        public NeuropointController(HttpClient httpClient) { 
            _httpClient = httpClient;
        }
        public async Task<IActionResult> Index()
        {
            DateTime now = DateTime.UtcNow;
            TimeZoneInfo pstZone = TimeZoneInfo.FindSystemTimeZoneById("Pacific Standard Time");
            DateTime pstTime = TimeZoneInfo.ConvertTimeFromUtc(now, pstZone);  

            var client = new SendGridClient(emailAPIKEY);
            var from = new EmailAddress("connor.wilson48@gmail.com", "Connor Wilson");
            var subject = "Neuropoint visited";
            var to = new EmailAddress("connor.wilson48@gmail.com", "Connor Wilson");
            var plainTextContent = "Somone has visited neuropoint from your website at " + pstTime;
            var htmlContent = "<p>Somone has visited neuropoint from your website at " + pstTime + "</p>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var msgResponse = await client.SendEmailAsync(msg); 

            return Redirect("https://neuro-point.com");
        }
    }
}
