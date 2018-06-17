using MuhuGame2018.Entities;
using MuhuGame2018.Services.Interfaces;
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

        public void SendConfirmationEmails(User user, string password, LodgingValidationResult validationResult)
        {
            var userEmail = GetUserConfirmationEmail(user, password, validationResult);
            _mailService.SendMail(new[] { user.Email }, "MUHUGAME 2018 - Výsledek registrace", userEmail);

            var orgsEmail = GetOrgsConfirmationEmail(userEmail, validationResult);
            _mailService.SendMail(new[] { "muhugame2018@gmail.com", "jiri.novak@petriny.net" }, "MUHUGAME 2018 - Registrace týmu", orgsEmail);
        }

        public void SendCostChangedEmails(User user, CostsSummary costsSummary)
        {
            var userEmail = GetUserCostsChangedEmail(user, costsSummary);
            _mailService.SendMail(new[] { user.Email }, "MUHUGAME 2018 - Změna výše platby", userEmail);
        }

        private string GetUserCostsChangedEmail(User user, CostsSummary costsSummary)
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendLine("Zaznamenali jsme změnu ovlivňující výši platby.");

            var costsSummaryText = GetCostsSummaryText(user, costsSummary);
            sb.AppendLine();
            sb.AppendLine(costsSummaryText);

            var signatureText = GetSignatureText(false);
            sb.AppendLine();
            sb.AppendLine(signatureText);

            return sb.ToString();
        }

        private string GetUserConfirmationEmail(User user, string password, LodgingValidationResult validationResult)
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

            if (!validationResult.OverLimit)
            {
                if (!validationResult.DesiredLodgingAssigned)
                {
                    sb.AppendLine();

                    if (validationResult.HutAssigned)
                    {
                        sb.AppendLine("Vámi vybrané ubytování v budově již bohužel není k dispozici! Bylo vám přiřazeno ubytování v chatce.");
                    }
                    else
                    {
                        sb.AppendLine("Vámi vybrané ubytování v chatce již bohužel není k dispozici! Bylo vám přiřazeno ubytování v budově.");
                    }
                }

                var costsSummaryText = GetCostsSummaryText(user, validationResult.Costs);
                sb.AppendLine();
                sb.AppendLine(costsSummaryText);
            }

            var signatureText = GetSignatureText(validationResult.OverLimit);
            sb.AppendLine();
            sb.AppendLine(signatureText);

            return sb.ToString();
        }

        private string GetSignatureText(bool overLimit)
        {
            StringBuilder sb = new StringBuilder();

            if (overLimit)
            {
                sb.AppendLine("Hodně štěstí!");
            }
            else
            {
                sb.AppendLine("Těšíme se na vás!");
            }

            sb.AppendLine();
            sb.AppendLine("Za kolektiv CK MUHUGAMES");
            sb.AppendLine();
            sb.AppendLine("Lamy");

            return sb.ToString();
        }

        private string GetCostsSummaryText(User user, CostsSummary costsSummary)
        {
            StringBuilder sb = new StringBuilder();

            sb.AppendLine($"Rekapitulace platby: ");
            sb.AppendLine($"  Počet účastníků: {user.Members.Count}");
            sb.AppendLine($"  Startovné: {costsSummary.StartingCost},- Kč");
            sb.AppendLine($"  Ubytování: {costsSummary.LodgingCost},- Kč");
            sb.AppendLine($"  Trička: {costsSummary.TshirtCost},- Kč");
            sb.AppendLine($"  Celková cena: {costsSummary.TotalCost},- Kč");

            sb.AppendLine();
            sb.AppendLine("Částku prosím uhraďte na číslo účtu: 670100 - 2215359802 / 6210 (Mbank) nejpozději do 25.7. 2018. Do zprávy pro příjemce vždy uveďte název týmu.");

            return sb.ToString();
        }

        private string GetOrgsConfirmationEmail(string emailToUser, LodgingValidationResult validationResult)
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
