using Microsoft.EntityFrameworkCore;
using MuhuGame2018.Entities;
using MuhuGame2018.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MuhuGame2018.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public bool Exists(Func<User, bool> predicate)
        {
            return _context.Users.Any(predicate);
        }

        public User Get(Func<User, bool> predicate)
        {
            return _context.Users.Include(x => x.Members).FirstOrDefault(predicate);
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users.Include(x => x.Members);
        }

        public void Add(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public void Update(User user)
        {
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void Delete(User user)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
        }
    }
}
