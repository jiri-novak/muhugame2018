using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.Extensions.Options;
using MuhuGame2018.Helpers;
using MuhuGame2018.DTO;

namespace MuhuGame2018.Controllers.API
{
    [Route("[controller]")]
    public class AppSettingsController : Controller
    {
        private readonly IOptions<AppSettings> _appSettings;
        private readonly IMapper _mapper;

        public AppSettingsController(
            IOptions<AppSettings> appSettings,
            IMapper mapper)
        {
            _appSettings = appSettings;
            _mapper = mapper;
        }

        [HttpGet("")]
        public IActionResult Get()
        {
            var appSettingsDto = _mapper.Map<AppSettings, AppSettingsDto>(_appSettings.Value);
            return Ok(appSettingsDto);
        }
    }
}