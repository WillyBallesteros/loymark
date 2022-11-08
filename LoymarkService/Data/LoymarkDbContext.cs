using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class LoymarkDbContext : DbContext, ILoymarkDbContext
    {
        public LoymarkDbContext()
        {
        }

        public LoymarkDbContext(DbContextOptions<LoymarkDbContext> options)
            : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data source=localhost\sqlexpress; 
                Initial Catalog=Loymark; Integrated Security=True")
            .LogTo(Console.WriteLine, new[] { DbLoggerCategory.Database.Command.Name }, Microsoft.Extensions.Logging.LogLevel.Information)
            .EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(m => m.Activities)
                .WithOne(m => m.User)
                .HasForeignKey(m => m.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);            
        }

        public DbSet<User>? Users { get; set; }
        public DbSet<Activity>? Activities { get; set; }
    }
}