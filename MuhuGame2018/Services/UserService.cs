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
        private readonly IMailService _mailService;
        private readonly IPasswordService _passwordService;
        private readonly IUserRepository _userRepository;
        private readonly IOptions<AppSettings> _appSettings;
        private readonly ILogger<UserService> _logger;

        public UserService(
            IMailService mailService, 
            IPasswordService passwordService,
            IUserRepository userRepository,
            IOptions<AppSettings> appSettings,
            ILogger<UserService> logger)
        {
            _mailService = mailService;
            _passwordService = passwordService;
            _userRepository = userRepository;
            _appSettings = appSettings;
            _logger = logger;
        }

        public User Authenticate(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;

            var user = _userRepository.Get(x => x.Email == email);

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

            TrySendMails(user, password);

            return user;
        }

        private void TrySendMails(User user, string password)
        {
            try
            {
                string emailBody = null;
                bool updateNeeded = false;

                var validationResult = LodgingValidator.Validate(_userRepository, _appSettings, user);

                StringBuilder sb = new StringBuilder();

                if (!validationResult.OverLimit)
                {
                    sb.AppendLine("Vaše registrace na Víkendový pobyt v Zóně proběhla úspěšně.");
                }
                else
                {
                    sb.AppendLine("Ceníme si vašeho zájmu o náš Víkendový pobyt v Zóně  s piknikem. Bohužel v tuto chvíli již kapacita počtu účastníků byla vyčerpána.");
                    sb.AppendLine("Registrace proběhla, Váš tým byl zařazen mezi náhradníky. V případě rozšíření kapacity či odhlášení některého z týmů budete kontaktováni organizátorem.");
                }

                sb.AppendLine();
                sb.AppendLine($"Jméno týmu: {user.Name}");
                sb.AppendLine($"Login: {user.Email}");
                sb.AppendLine($"Heslo: {password}");
                sb.AppendLine($"Pořadí přihlášení: {validationResult.Order} ({user.RegistrationDate.ToString("dd.MM.yyyy HH:mm:ss")})");
                sb.AppendLine();

                if (!validationResult.OverLimit)
                {
                    int memberCount = user.Members.Count;
                    int memberLodging = validationResult.HutAssigned ? 850 : 1000;

                    if (!validationResult.DesiredLodgingAssigned)
                    {
                        if (validationResult.HutAssigned)
                        {
                            sb.AppendLine("Vámi vybrané ubytování v budově již bohužel není k dispozici! Bylo vám přiřazeno ubytování v chatce.");
                            sb.AppendLine();

                            user.Variant = memberCount == 3 ? "Chatka3" : "Chatka4";
                        }
                        else
                        {
                            sb.AppendLine("Vámi vybrané ubytování v chatce již bohužel není k dispozici! Bylo vám přiřazeno ubytování v budově.");
                            sb.AppendLine();

                            user.Variant = memberCount == 3 ? "Budova3" : "Budova4";
                        }

                        foreach (var m in user.Members)
                            m.Cost = memberLodging + 250 * (m.Tshirt == null ? 0 : 1);

                        updateNeeded = true;
                    }

                    int start = 1200;
                    int shirts = user.Members.Count(x => x.Tshirt != null) * 250;
                    int lodging = memberCount * memberLodging;
                    int total = start + lodging + shirts;

                    sb.AppendLine($"Rekapitulace platby: ");
                    sb.AppendLine($"  Počet účastníků: {memberCount}");
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
                    _userRepository.Update(user);
                }

                _mailService.SendMail(new[] { user.Email }, "MUHUGAME 2018 - Výsledek registrace", emailBody);

                var sb2 = new StringBuilder();
                sb2.AppendLine("Právě proběhla registrace týmu:");
                sb2.AppendLine();
                sb2.AppendLine("===============================");
                sb2.AppendLine(emailBody);
                var emailBody2 = sb2.ToString();

                _mailService.SendMail(new[] { "muhugame2018@gmail.com", "jiri.novak@petriny.net" }, "MUHUGAME 2018 - Registrace týmu", emailBody2);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Chyba při odesílání emailů. {ex.ToString()}");
            }
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

            // update user properties
            user.Name = userParam.Name;
            user.Email = userParam.Email;
            user.Telephone = userParam.Telephone;
            user.Variant = userParam.Variant;
            user.Note = userParam.Note;

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
