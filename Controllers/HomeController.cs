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

namespace Connor_Wilson.Controllers
{
	public class HomeController : Controller
	{
		private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
		private readonly HttpClient _httpClient;


        private string? accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        private string? authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");
		private string? phoneNumber;
		private string? twilioPhoneNumber;



        public HomeController(ILogger<HomeController> logger, IConfiguration configuration, HttpClient httpClient)
        {
            _logger = logger;
            _configuration = configuration;
            phoneNumber = _configuration["Twilio:MyPhoneNumber"];
            twilioPhoneNumber = _configuration["Twilio:TwilioPhoneNumber"];
            _httpClient = httpClient;
        }

        public async Task<IActionResult> Index()
		{

            var url = $"https://www.duolingo.com/2017-06-30/users?username=Connor660733";
            HttpResponseMessage response = await _httpClient.GetAsync(url);

            string streak = "";

            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                var data = JObject.Parse(json);
                streak = (data["users"][0]["streak"]?.ToObject<int?>()).ToString(); 
               
            }


            TwilioClient.Init(accountSid, authToken);

			var messageOptions = new CreateMessageOptions(
			new PhoneNumber(phoneNumber));
            messageOptions.From = new PhoneNumber(twilioPhoneNumber);
			messageOptions.Body = "Someone has visited your site";


            var message = MessageResource.Create(messageOptions);


            IndexViewModel model = new IndexViewModel()
            {
                DuoLingoStreak = streak,


            };
           

            return View(model);
		}

		public IActionResult Submit([FromBody] ContactModel form)
		{
           
			TwilioClient.Init(accountSid, authToken);

            var messageOptions = new CreateMessageOptions(
              new PhoneNumber("3606103373"));
            messageOptions.From = new PhoneNumber("+18885566261");
            messageOptions.Body = "Name: " + form.Name + " \nEmail: " + form.Email + "\nPhone Number: " + form.PhoneNumber + "\nMessage: " + form.Message;


            var message = MessageResource.Create(messageOptions);
            

            return Ok(new { success = true, message = "Contact information received successfully." });

        }

		public IActionResult Github() {

            var messageOptions = new CreateMessageOptions(
              new PhoneNumber("3606103373"));
            messageOptions.From = new PhoneNumber("+18885566261");
            messageOptions.Body = "Someone has tapped the Github link";
            var message = MessageResource.Create(messageOptions);
            return Ok(new { success = true});

        }

		

		

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}
