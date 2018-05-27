using Microsoft.EntityFrameworkCore;
using MuhuGame2018.Entities;

namespace MuhuGame2018.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
