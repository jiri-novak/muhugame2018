﻿using System.Net;
using System.Net.Mail;

namespace MuhuGame2018.Services
{
    public class MailService : IMailService
    {
        private readonly string _smtpServer;
        private readonly string _smtpUser;
        private readonly string _smtpPasswd;

        public MailService()
        {
            _smtpServer = "smtp.gmail.com";
            _smtpUser = "muhugame2018@gmail.com";
            _smtpPasswd = "velkavikuna";
        }

        public void SendMail(string from, string[] tos, string subject, string body)
        {
            SmtpClient client = new SmtpClient(_smtpServer)
            {
                UseDefaultCredentials = false,
                EnableSsl = true,
                Credentials = new NetworkCredential(_smtpUser, _smtpPasswd)
            };

            MailMessage mailMessage = new MailMessage
            {
                From = new MailAddress(from)
            };
            foreach (var to in tos)
                mailMessage.To.Add(to);
            mailMessage.Body = body;
            mailMessage.Subject = subject;

            client.Send(mailMessage);
        }
    }
}
