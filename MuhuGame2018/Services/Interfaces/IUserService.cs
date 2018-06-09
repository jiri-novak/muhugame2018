using MuhuGame2018.Entities;
using System.Collections.Generic;

namespace MuhuGame2018.Services
{

    public interface IUserService
    {
        User Authenticate(string username, string password);

        IEnumerable<User> GetAll();
        User GetById(int id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void ResetPassword(int id, string password);
        void Delete(int id);
    }
}
