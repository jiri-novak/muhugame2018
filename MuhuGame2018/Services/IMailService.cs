﻿namespace MuhuGame2018.Services
{
    public interface IMailService
    {
        void SendMail(string from, string to, string subject, string body);
    }
}
