namespace Domain.DTOs
{
    public class ActivityDto
    {
        public int Id { get; set; }
        public DateTime? CreationDate { get; set; } = DateTime.UtcNow;
        public int UserId { get; set; }
        public string? Observation { get; set; }
        public string FullName { get; set; }
    }
}
