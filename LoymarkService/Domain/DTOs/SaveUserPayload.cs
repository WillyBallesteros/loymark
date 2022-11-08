using System.Text.Json.Serialization;

namespace Domain.DTOs
{
    public class SaveUserPayload
    {
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Phone { get; set; }
        public string ResidenceCountry { get; set; }
        public bool? ReceiveInformation { get; set; }
        [JsonIgnore]
        public ICollection<ActivityDto> Activities { get; set; } = new List<ActivityDto>();
    }
}
