using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MuhuGame2018.Entities;
using MuhuGame2018.Helpers;
using MuhuGame2018.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MuhuGame2018.Services
{
    public class UserService : IUserService
    {
        private readonly ILodgingService _lodgingService;
        private readonly IPasswordService _passwordService;
        private readonly IUserRepository _userRepository;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly ILogger<UserService> _logger;

        public UserService(
            IPasswordService passwordService,
            IUserRepository userRepository,
            ILodgingService lodgingService,
            IOptions<AppSettings> appSettings,
            ILogger<UserService> logger)
        {
            _passwordService = passwordService;
            _userRepository = userRepository;
            _lodgingService = lodgingService;
            _appSettings = appSettings;
            _logger = logger;
        }

        public User Authenticate(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;

            User user;
            var adminUser = _appSettings.Value.AdminUsers.FirstOrDefault(x => x.Email == email);
            if (adminUser != null)
            {
                _passwordService.CreatePasswordHash(adminUser.Password, out var hash, out var salt);
                user = new User
                {
                    Id = int.MaxValue,
                    Name = adminUser.Name,
                    Email = adminUser.Email,
                    PasswordHash = hash,
                    PasswordSalt = salt
                };
            }
            else
            {
                user = _userRepository.Get(x => x.Email == email);
            }

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!_passwordService.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // authentication successful
            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return _userRepository.GetAll().OrderBy(x => x.RegistrationDate);
        }

        public User GetById(int id)
        {
            return _userRepository.Get(x => x.Id == id);
        }

        public User Create(User user, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Heslo je povinné!");

            if (_userRepository.Exists(x => x.Email == user.Email))
                throw new AppException($"Email {user.Email} je již obsazen!");

            if (_userRepository.Exists(x => x.Name == user.Name))
                throw new AppException($"Jméno {user.Name} je již obsazeno!");

            _passwordService.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.RegistrationDate = DateTime.Now;

            _userRepository.Add(user);

            var validationResult = LodgingValidator.Validate(_userRepository, _appSettings, user);

            try
            {
                _lodgingService.SendConfirmationEmails(user, password, validationResult);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Chyba při odesílání emailů. {ex.ToString()}");
            }

            return user;
        }

        public void Update(User userParam, string password = null)
        {
            var user = _userRepository.Get(x => x.Id == userParam.Id);

            if (user == null)
                throw new AppException("Uživatel nenalezen!");

            if (userParam.Email != user.Email)
            {
                // username has changed so check if the new username is already taken
                if (_userRepository.Exists(x => x.Email == userParam.Email))
                    throw new AppException($"Email {userParam.Email} je již obsazen!");
            }

            // check whether cost changed
            var previousCost = LodgingValidator.CalculateCosts(_userRepository, _appSettings, user);
            var newCost = LodgingValidator.CalculateCosts(_userRepository, _appSettings, userParam);

            if (previousCost.TotalCost != newCost.TotalCost)
            {
                try
                {
                    _lodgingService.SendCostChangedEmails(user, newCost);
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Chyba při odesílání emailů. {ex.ToString()}");
                }
            }

            // update user properties
            user.Name = userParam.Name;
            user.Email = userParam.Email;
            user.Telephone = userParam.Telephone;
            user.Variant = userParam.Variant;
            user.Note = userParam.Note;
            user.Paid = userParam.Paid;

            for (var i = 0; i < userParam.Members.Count(); ++i)
            {
                if (i < user.Members.Count)
                {
                    var member = user.Members[i];
                    var userParamMember = userParam.Members[i];

                    // update member properties
                    member.Order = userParamMember.Order;
                    member.Cost = userParamMember.Cost;
                    member.Dinner1 = userParamMember.Dinner1;
                    member.Dinner2 = userParamMember.Dinner2;
                    member.Name = userParamMember.Name;
                    member.Tshirt = userParamMember.Tshirt;
                }
                else
                {
                    user.Members.Add(userParam.Members[i]);
                }
            }

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                _passwordService.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _userRepository.Update(user);
        }

        public void ResetPassword(int id, string password)
        {
            var user = _userRepository.Get(x => x.Id == id);

            if (user == null)
                throw new AppException("Uživatel nenalezen!");

            _passwordService.CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _userRepository.Update(user);
        }

        public void Delete(int id)
        {
            var user = _userRepository.Get(x => x.Id == id);
            if (user != null)
            {
                _userRepository.Delete(user);
            }
        }
    }
}
