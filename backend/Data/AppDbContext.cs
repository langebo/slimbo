using Microsoft.EntityFrameworkCore;
using Slimbo.Models.Entities;

namespace Slimbo.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Measurement> Measurements { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Measurement>(e => e.HasKey(m => m.Id));
        }
    }
}