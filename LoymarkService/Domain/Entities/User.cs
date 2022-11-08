using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Common;

namespace Domain.Entities
{
    public class User : BaseDomainModel
    {
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Phone { get; set; }
        public string ResidenceCountry { get; set; }
        public bool ReceiveInformation { get; set; }
        public ICollection<Activity>? Activities { get; set; } = new List<Activity>();
    }
}
