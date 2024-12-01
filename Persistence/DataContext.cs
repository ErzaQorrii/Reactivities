using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    //Database Manager
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Activity> Activities { get; set; }
    }

}
