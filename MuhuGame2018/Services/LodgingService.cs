using MuhuGame2018.Entities;
using MuhuGame2018.Services.Interfaces;
using System.Linq;
using System.Text;

namespace MuhuGame2018.Services
{
    public class LodgingService : ILodgingService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMailService _mailService;

        public LodgingService(IUserRepository userRepository, IMailService mailService)
        {
            _userRepository = userRepository;
            _mailService = mailService;
        }

        public void SendConfirmationEmails(User user, string password, LodgingValidator.LodgingValidationResult validationResult)
        {
            var userEmail = GetUserConfirmationEmail(user, password, validationResult);
            _mailService.SendMail(new[] { user.Email }, "MUHUGAME 2018 - Výsledek registrace", userEmail);

            var orgsEmail = GetOrgsConfirmationEmail(userEmail, validationResult);
            _mailService.SendMail(new[] { "muhugame2018@gmail.com", "jiri.novak@petriny.net" }, "MUHUGAME 2018 - Registrace týmu", orgsEmail);
        }

        private string GetUserConfirmationEmail(User user, string password, LodgingValidator.LodgingValidationResult validationResult)
        {
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
                if (!validationResult.DesiredLodgingAssigned)
                {
                    if (validationResult.HutAssigned)
                    {
                        sb.AppendLine("Vámi vybrané ubytování v budově již bohužel není k dispozici! Bylo vám přiřazeno ubytování v chatce.");
                        sb.AppendLine();
                    }
                    else
                    {
                        sb.AppendLine("Vámi vybrané ubytování v chatce již bohužel není k dispozici! Bylo vám přiřazeno ubytování v budově.");
                        sb.AppendLine();
                    }
                }
                
                sb.AppendLine($"Rekapitulace platby: ");
                sb.AppendLine($"  Počet účastníků: {user.Members.Count}");
                sb.AppendLine($"  Startovné: {validationResult.Costs.StartingCost},- Kč");
                sb.AppendLine($"  Ubytování: {validationResult.Costs.LodgingCost},- Kč");
                sb.AppendLine($"  Trička: {validationResult.Costs.TshirtCost},- Kč");
                sb.AppendLine($"  Celková cena: {validationResult.Costs.TotalCost},- Kč");
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

            return sb.ToString();
        }

        private string GetOrgsConfirmationEmail(string emailToUser, LodgingValidator.LodgingValidationResult validationResult)
        {
            var sb2 = new StringBuilder();
            sb2.AppendLine("Právě proběhla registrace týmu:");
            sb2.AppendLine();
            sb2.AppendLine("===============================");
            sb2.AppendLine(emailToUser);
            return sb2.ToString();
        }
    }
}
