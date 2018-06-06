using MuhuGame2018.Entities;
using System.Collections.Generic;

namespace MuhuGame2018.Services
{

    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        void TrySendMails(User user, string password);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
    }
}
