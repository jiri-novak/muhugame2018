using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using MuhuGame2018.Entities;
using MuhuGame2018.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MuhuGame2018.Services
{

    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IMailService _mailService;
        private readonly ILogger<UserService> _logger;

        public UserService(DataContext context, IMailService mailService, ILogger<UserService> logger)
        {
            _context = context;
            _mailService = mailService;
            _logger = logger;
        }

        public User Authenticate(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Users.SingleOrDefault(x => x.Email == email);

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
            return _context.Users.Include(x => x.Members).OrderBy(x => x.RegistrationDate);
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

            if (_context.Users.Any(x => x.Email == user.Email))
                throw new AppException($"Email {user.Email} je již obsazen!");

            if (_context.Users.Any(x => x.Name == user.Name))
                throw new AppException($"Jméno {user.Name} je již obsazeno!");

            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            user.RegistrationDate = DateTime.Now;

            _context.Users.Add(user);
            _context.SaveChanges();

            try
            {
                string emailBody = null;
                bool updateNeeded = false;

                var validationResult = UserValidator.ValidateLodging(user);

                StringBuilder sb = new StringBuilder();

                if (!validationResult.Nahradnik)
                {
                    sb.AppendLine("Vaše registrace na Víkendový pobyt v Zóně proběhla úspěšně.");
                }
                else
                {
                    sb.AppendLine("Ceníme si vašeho zájmu o náš zájezd.Bohužel v tuto chvíli již kapacita počtu účastníků byla vyčerpána.");
                    sb.AppendLine("Registrace proběhla, Váš tým byl zařazen mezi náhradníky. V případě rozšíření kapacity či odhlášení některého z týmů budete kontaktováni organizátorem.");
                }

                sb.AppendLine();
                sb.AppendLine($"Login: {user.Email}");
                sb.AppendLine($"Pořadí přihlášení: {validationResult.Poradi} ({user.RegistrationDate.ToString("dd.MM.yyyy HH:mm:ss")})");
                sb.AppendLine();

                if (!validationResult.Nahradnik)
                {
                    int memberCount = user.Members.Count;
                    int memberLodging = validationResult.PrirazenoVChatce ? 850 : 1000;

                    if (!validationResult.PrirazenoChteneUbytovani)
                    {
                        if (validationResult.PrirazenoVChatce)
                        {
                            sb.AppendLine("Vámi vybrané ubytování v budově již není k dispozici! Bylo vám přiřazeno ubytování v chatce.");
                            sb.AppendLine();

                            user.Variant = memberCount == 3 ? "Chatka3" : "Chatka4";
                        }
                        else
                        {
                            sb.AppendLine("Vámi vybrané ubytování v chatce již není k dispozici! Bylo vám přiřazeno ubytování v budově.");
                            sb.AppendLine();

                            user.Variant = memberCount == 3 ? "Budova3" : "Budova4";
                        }

                        foreach (var m in user.Members)
                            m.Cost = memberLodging + 250 * (m.TShirt == null ? 0 : 1);

                        updateNeeded = true;
                    }

                    int start = 1200;
                    int shirts = user.Members.Count(x => x.TShirt != null) * 250;
                    int lodging = memberCount * memberLodging;
                    int total = start + lodging + shirts;

                    sb.AppendLine($"Rekapitulace platby: ");
                    sb.AppendLine($"  Startovné: {start},- Kč");
                    sb.AppendLine($"  Ubytování: {lodging},- Kč");
                    sb.AppendLine($"  Trička: {shirts},- Kč");
                    sb.AppendLine($"  Celková cena: {total},- Kč");
                    sb.AppendLine();
                    sb.AppendLine("Částku prosím uhraďte na číslo účtu: 670100 - 2215359802 / 6210 (Mbank) nejpozději do 25.7. 2018. Do zprávy pro příjemce vždy uveďte název týmu.");
                    sb.AppendLine();
                    sb.AppendLine("Těšíme se na vás!");
                }
                else
                {
                    sb.AppendLine("Hodně štěstí!");
                }

                sb.AppendLine();
                sb.AppendLine("Za kolektiv CK MUHUGAMES");
                sb.AppendLine();
                sb.AppendLine("Lamy");

                emailBody = sb.ToString();

                if (updateNeeded)
                {
                    _context.Users.Update(user);
                    _context.SaveChanges();
                }

                _mailService.SendMail(new[] { user.Email }, "MUHUGAME 2018 - Výsledek registrace", emailBody);

                var sb2 = new StringBuilder();
                sb2.AppendLine("Právě proběhla registrace týmu:");
                sb2.AppendLine();
                sb2.AppendLine("===============================");
                sb2.AppendLine(emailBody);
                var emailBody2 = sb2.ToString();

                _mailService.SendMail(new[] { "jiri.novak@petriny.net" }, "MUHUGAME 2018 - Registrace týmu", emailBody2);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Chyba při odesílání emailů. {ex.ToString()}");
            }

            return user;
        }

        public void Update(User userParam, string password = null)
        {
            var user = _context.Users.Include(x => x.Members).FirstOrDefault(x => x.Id == userParam.Id);

            if (user == null)
                throw new AppException("Uživatel nenalezen!");

            if (userParam.Email != user.Email)
            {
                // username has changed so check if the new username is already taken
                if (_context.Users.Any(x => x.Email == userParam.Email))
                    throw new AppException($"Email {userParam.Email} je již obsazen!");
            }

            // update user properties
            user.Name = userParam.Name;
            user.Email = userParam.Email;
            user.Telephone = userParam.Telephone;
            user.Variant = userParam.Variant;

            for (var i = 0; i < userParam.Members.Count(); ++i)
            {
                if (i < user.Members.Count)
                {
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
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
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
