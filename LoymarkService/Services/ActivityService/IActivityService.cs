using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.DTOs;

namespace Services.ActivityService
{
    public interface IActivityService
    {
        Task<List<ActivityDto>> GetAllActivitiesAsync();
    }
}
