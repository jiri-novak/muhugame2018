namespace MuhuGame2018.Services.Interfaces
{
    public interface IMailService
    {
        void SendMail(string[] tos, string subject, string body);
    }
}
