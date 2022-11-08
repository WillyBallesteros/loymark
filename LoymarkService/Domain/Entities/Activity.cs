using Domain.Common;

namespace Domain.Entities
{
    public class Activity : BaseDomainModel
    {
        public DateTime? CreationDate { get; set; } = DateTime.UtcNow;
        public int UserId { get; set; }
        public string? Observation { get; set; }
        public virtual User? User { get; set; }
    }
}
