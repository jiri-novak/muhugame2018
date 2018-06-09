using MuhuGame2018.Entities;
using System;
using System.Collections.Generic;

namespace MuhuGame2018.Services
{
    public interface IUserRepository
    {
        User Get(Func<User, bool> predicate);
        IEnumerable<User> GetAll();
        bool Exists(Func<User, bool> predicate);
        void Add(User user);
        void Update(User user);
        void Delete(User user);
    }
}
