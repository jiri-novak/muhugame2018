using Microsoft.AspNetCore.Mvc;
using MuhuGame2018.Services;

namespace MuhuGame2018.Controllers.API
{
    [Route("[controller]")]
    public class TestController : Controller
    {
        private readonly IMailService _mailService;

        public TestController(IMailService mailService)
        {
            _mailService = mailService;
        }

        [HttpPost("test")]
        public IActionResult Test()
        {
            _mailService.SendMail(new[] { "jiri.novak@petriny.net" }, "TEST", "Test jestli to funguje z Azure.");
            return Ok();
        }
    }
}