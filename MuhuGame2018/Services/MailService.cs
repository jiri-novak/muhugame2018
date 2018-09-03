using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MuhuGame2018.Helpers;
using MuhuGame2018.Services.Interfaces;
using System.Net;
using System.Net.Mail;

namespace MuhuGame2018.Services
{
    public class MailService : IMailService
    {
        private readonly string _smtpHost;
        private readonly int _smtpPort;
        private readonly string _smtpUser;
        private readonly string _smtpPasswd;

        public MailService(IOptions<AppSettings> appSettings)
        {
            _smtpHost = appSettings.Value.SmtpSettings.Host;
            _smtpPort = appSettings.Value.SmtpSettings.Port;
            _smtpUser = appSettings.Value.SmtpSettings.User;
            _smtpPasswd = appSettings.Value.SmtpSettings.Password;
        }

        public void SendMail(string[] tos, string subject, string body)
        {
            SmtpClient client = new SmtpClient(_smtpHost, _smtpPort)
            {
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new NetworkCredential(_smtpUser, _smtpPasswd)
            };

            MailMessage mailMessage = new MailMessage { From = new MailAddress(_smtpUser) };
            foreach (var to in tos)
                mailMessage.To.Add(to);
            mailMessage.Body = body;
            mailMessage.Subject = subject;

            client.Send(mailMessage);
        }
    }
}
