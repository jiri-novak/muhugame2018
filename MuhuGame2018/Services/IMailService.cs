namespace MuhuGame2018.Services
{
    public interface IMailService
    {
        void SendMail(string from, string[] tos, string subject, string body);
    }
}
