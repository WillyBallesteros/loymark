namespace Domain.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Phone { get; set; }
        public string ResidenceCountry { get; set; }
        public bool ReceiveInformation { get; set; }
        public IList<ActivityDto>? Activities { get; set; }
    }
}
