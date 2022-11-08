using Domain.Logger;
using Microsoft.AspNetCore.Mvc;
using Services.ActivityService;
using Services.UserService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private ILoggerManager _logger;
        private IActivityService _activityService;

        public ActivitiesController(ILoggerManager logger, IActivityService activityService)
        {
            _logger = logger;
            _activityService = activityService;
        }
        // GET: api/<ActivitiesController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            _logger.LogInfo("Fetching all the Activities from the storage");
            var activities = await _activityService.GetAllActivitiesAsync();
            _logger.LogInfo($"Returning {activities.Count} activities.");
            return Ok(activities);
        }
    }
}
