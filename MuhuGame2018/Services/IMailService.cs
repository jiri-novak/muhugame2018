namespace MuhuGame2018.Services
{
    public interface IMailService
    {
        void SendMail(string[] tos, string subject, string body);
    }
}
