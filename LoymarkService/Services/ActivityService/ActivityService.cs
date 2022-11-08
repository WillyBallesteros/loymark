using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Data;
using Domain.DTOs;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Services.UserService;

namespace Services.ActivityService
{
    public class ActivityService : IActivityService
    {
        private readonly ILoymarkDbContext _context;
        private readonly IMapper _mapper;

        public ActivityService(ILoymarkDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<ActivityDto>> GetAllActivitiesAsync()
        {
            var activities = await _context!.Activities!
                .Join(_context!.Users, a => a.UserId, a => a.Id, (activity, user) => new 
                ActivityDto()
                {
                    Id = activity.Id,
                    CreationDate = activity.CreationDate,
                    Observation = activity.Observation,
                    FullName = $"{user.Name} {user.Lastname}",
                }).AsNoTracking().OrderByDescending(x => x.CreationDate).ToListAsync();

            var activitiesDto = _mapper.Map<List<ActivityDto>>(activities);
            return activitiesDto;
        }
    }
}
