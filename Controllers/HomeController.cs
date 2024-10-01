using Connor_Wilson.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System.Diagnostics;
using System.Net.Http;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Connor_Wilson.Controllers
{
	public class HomeController : Controller
	{
		private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
		private readonly HttpClient _httpClient;
        private readonly IWebHostEnvironment _env;
         
        private string? emailAPIKEY = Environment.GetEnvironmentVariable("Website_Notification");

        public HomeController(ILogger<HomeController> logger, IConfiguration configuration, HttpClient httpClient, IWebHostEnvironment env)
        {
            _logger = logger;
            _configuration = configuration;
            _httpClient = httpClient;
            _env = env;
        }

        public async Task<IActionResult> Index()
		{

            var url = $"https://www.duolingo.com/2017-06-30/users?username=Connor660733";
            HttpResponseMessage duoResponse = await _httpClient.GetAsync(url);

            string streak = "";

            if (duoResponse.IsSuccessStatusCode)
            {
                var json = await duoResponse.Content.ReadAsStringAsync();
                var data = JObject.Parse(json);
                streak = (data["users"][0]["streak"]?.ToObject<int?>()).ToString(); 
               
            }

            if (!_env.IsDevelopment())
            {
                var client = new SendGridClient(emailAPIKEY);
                var from = new EmailAddress("connor.wilson48@gmail.com", "Connor Wilson");
                var subject = "Website visited";
                var to = new EmailAddress("connor.wilson48@gmail.com", "Connor Wilson");
                var plainTextContent = "Somone has visited your site";
                var htmlContent = "<p>Someone has visited your site</p>";
                var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
                var msgResponse = await client.SendEmailAsync(msg);
            }
                 


            IndexViewModel model = new IndexViewModel()
            {
                DuoLingoStreak = streak,


            };
           

            return View(model);
		}

		public async Task<IActionResult> Submit([FromBody] ContactModel form)
		{
            var client = new SendGridClient(emailAPIKEY);
            var from = new EmailAddress("connor.wilson48@gmail.com", "Connor Wilson");
            var subject = "Inquiry from personal website";
            var to = new EmailAddress("connor.wilson48@gmail.com", "Connor Wilson");
            var plainTextContent = "Somone has visited your site";
            var htmlContent = "<p>" + "Name: " + form.Name + "</p>" + 
                "<p>Email: " + form.Email + "</p>" +
                "<p>Phone Number: " + form.PhoneNumber + "</p>" +
                "<p>Message: " + form.Message + "</p>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var msgResponse = await client.SendEmailAsync(msg); 


            return Ok(new { success = true, message = "Contact information received successfully." });    

        }

		public async Task <IActionResult> Github() {

            var client = new SendGridClient(emailAPIKEY);
            var from = new EmailAddress("connor.wilson48@gmail.com", "Connor Wilson");
            var subject = "Github visited";
            var to = new EmailAddress("connor.wilson48@gmail.com", "Connor Wilson");
            var plainTextContent = "Somone has visited your Github from your personal site";
            var htmlContent = "<p>Someone has visited your Github from your personal site</p>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var msgResponse = await client.SendEmailAsync(msg);

            return Ok(new { success = true});

        }

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}
