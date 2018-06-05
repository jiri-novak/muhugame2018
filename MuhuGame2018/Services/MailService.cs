using System.Net;
using System.Net.Mail;

namespace MuhuGame2018.Services
{
    public class MailService : IMailService
    {
        private readonly string _smtpServer;
        private readonly int _smtpPort;
        private readonly string _smtpUser;
        private readonly string _smtpPasswd;

        public MailService()
        {
            _smtpServer = "smtp.gmail.com";
            _smtpPort = 587;
            _smtpUser = "muhugame2018@gmail.com";
            _smtpPasswd = "velkavikuna";
        }

        public void SendMail(string[] tos, string subject, string body)
        {
            SmtpClient client = new SmtpClient(_smtpServer, _smtpPort)
            {
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new NetworkCredential(_smtpUser, _smtpPasswd)
            };

            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(_smtpUser);
            foreach (var to in tos)
                mailMessage.To.Add(to);
            mailMessage.Body = body;
            mailMessage.Subject = subject;

            client.Send(mailMessage);
        }
    }
}
