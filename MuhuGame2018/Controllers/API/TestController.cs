//using Microsoft.AspNetCore.Mvc;
//using MuhuGame2018.Services;
//using System;
//using System.Linq;

//namespace MuhuGame2018.Controllers.API
//{
//    [Route("[controller]")]
//    public class TestController : Controller
//    {
//        private readonly IMailService _mailService;
//        private readonly IUserService _userService;

//        public TestController(IMailService mailService, IUserService userService)
//        {
//            _mailService = mailService;
//            _userService = userService;
//        }

//        [HttpPost("test")]
//        public IActionResult Test()
//        {
//            var over1 = _userService.GetById(37);
//            var over2 = _userService.GetById(38);

//            _userService.TrySendMails(over1, "Kacenka");
//            _userService.TrySendMails(over2, "kedlubna");

//            return Ok();
//        }

//        [HttpPost("current-date")]
//        public IActionResult RegistrationsReady()
//        {
//            return Ok(DateTime.UtcNow);
//        }
//    }
//}