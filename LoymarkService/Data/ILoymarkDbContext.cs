using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Data
{
    public interface ILoymarkDbContext
    {
        DbSet<User>? Users { get; set; }
        DbSet<Activity>? Activities { get; set; }

        bool Equals(object obj);
        int GetHashCode();
        string ToString();

        int SaveChanges();
        int SaveChanges(bool acceptAllChangesOnSuccess);
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken);
        ValueTask DisposeAsync();

        EntityEntry Add(object entity);

        ValueTask<EntityEntry> AddAsync(object entity, CancellationToken cancellationToken);

        EntityEntry Update(object entity);

        EntityEntry Remove(object entity);
        void AddRange(params object[] entities);
        void AddRange(IEnumerable<object> entities);
        Task AddRangeAsync(params object[] entities);
        Task AddRangeAsync(IEnumerable<object> entities, CancellationToken cancellationToken);
        DbSet<TEntity> Set<TEntity>() where TEntity : class;
    }
}
