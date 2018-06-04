using Microsoft.EntityFrameworkCore;
using MuhuGame2018.Entities;
using MuhuGame2018.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MuhuGame2018.Services
{

    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IMailService _mailService;

        public UserService(DataContext context, IMailService mailService)
        {
            _context = context;
            _mailService = mailService;
        }

        public User Authenticate(string login, string password)
        {
            if (string.IsNullOrEmpty(login) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Users.SingleOrDefault(x => x.Login == login);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // authentication successful
            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users.Include(x => x.Members);
        }

        public User GetById(int id)
        {
            return _context.Users.Include(x => x.Members).FirstOrDefault(x => x.Id == id);
        }

        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Heslo je povinné!");

            if (_context.Users.Any(x => x.Login == user.Login))
                throw new AppException($"Login {user.Login} je již obsazen!");

            if (_context.Users.Any(x => x.Name == user.Name))
                throw new AppException($"Jméno {user.Name} je již obsazeno!");

            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);
            _context.SaveChanges();

            try
            {
                _mailService.SendMail("muhugame2018@gmail.com", user.Email, "MUHUGAME 2018 - Registrace byla úspěšná", "Vaše registrace na Víkendový pobyt v Zóně proběhla úspěšně.");
            }
            catch(Exception ex)
            {
                Console.Error.WriteLine($"Chyba při odesílání emailů. {ex.ToString()}");
            }

            return user;
        }

        public void Update(User userParam, string password = null)
        {
            var user = _context.Users.Include(x => x.Members).FirstOrDefault(x => x.Id == userParam.Id);

            if (user == null)
                throw new AppException("Uživatel nenalezen!");

            if (userParam.Login != user.Login)
            {
                // username has changed so check if the new username is already taken
                if (_context.Users.Any(x => x.Login == userParam.Login))
                    throw new AppException($"Login {userParam.Login} je již obsazen!");
            }

            // update user properties
            user.Login = userParam.Login;
            user.Name = userParam.Name;
            user.Email = userParam.Email;
            user.Telephone = userParam.Telephone;
            user.Variant = userParam.Variant;
            
            for (var i = 0; i < userParam.Members.Count(); ++i)
            {
                if (i < user.Members.Count) {
                    var member = user.Members[i];
                    var userParamMember = userParam.Members[i];

                    member.Order = userParamMember.Order;
                    member.Cost = userParamMember.Cost;
                    member.Dinner1 = userParamMember.Dinner1;
                    member.Dinner2 = userParamMember.Dinner2;
                    member.Name = userParamMember.Name;
                }
                else
                {
                    user.Members.Add(userParam.Members[i]);
                }
            }

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}
