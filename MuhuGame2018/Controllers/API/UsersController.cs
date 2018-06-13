using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using MuhuGame2018.Services;
using MuhuGame2018.Helpers;
using MuhuGame2018.DTO;
using MuhuGame2018.Entities;
using System.Linq;

namespace MuhuGame2018.Controllers.API
{
    [Authorize]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]UserLoginDto userDto)
        {
            var user = _userService.Authenticate(userDto.Email, userDto.Password);

            if (user == null)
                return Unauthorized();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, _appSettings.AdminUsers.Any(x => x.Email == user.Email) ? "Admin" : "Team")
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return Ok(new UserInfoDto
            {
                Id = user.Id,
                Name = user.Name,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Register([FromBody]UserDto userDto)
        {
            // map dto to entity
            var user = _mapper.Map<User>(userDto);

            // save 
            _userService.Create(user, userDto.Password);
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            var userDtos = _mapper.Map<IList<UserDto>>(users);
            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (!HasClaimForUserOrIsAdmin(id))
                return Unauthorized();

            var user = _userService.GetById(id);
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UserDto userDto)
        {
            if (!HasClaimForUserOrIsAdmin(id))
                return Unauthorized();

            // map dto to entity and set id
            var user = _mapper.Map<User>(userDto);
            user.Id = id;

            // save 
            _userService.Update(user, userDto.Password);
            return Ok();
        }

        [HttpPost("{id}/reset-password")]
        public IActionResult ResetPassword(int id, [FromBody] PasswordResetDto passwordReset)
        {
            if (!HasClaimForUserOrIsAdmin(id))
                return Unauthorized();

            _userService.ResetPassword(id, passwordReset.NewPassword);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (!HasClaimForUserOrIsAdmin(id))
                return Unauthorized();

            _userService.Delete(id);
            return Ok();
        }

        private bool HasClaimForUserOrIsAdmin(int id)
        {
            var nameClaim = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name);
            var roleClaim = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role);

            if (nameClaim == null || roleClaim == null)
                return false;

            return id == int.Parse(nameClaim.Value) || roleClaim.Value == "Admin";
        }
    }
}