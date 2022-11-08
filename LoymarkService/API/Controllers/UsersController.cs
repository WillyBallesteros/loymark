using System;
using Domain.DTOs;
using Domain.Logger;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Services.UserService;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private ILoggerManager _logger;
        private IUserService _userService;
        private IValidator<SaveUserPayload> _validator;
        private IValidator<EditUserPayload> _validatorEdit;
        public UsersController(ILoggerManager logger, IUserService userService, IValidator<SaveUserPayload> validator, IValidator<EditUserPayload> validatorEdit)
        {
            _logger = logger;
            _userService = userService;
            _validator = validator;
            _validatorEdit = validatorEdit;
        }
        // GET: api/<UsersController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            _logger.LogInfo("Fetching all the Users from the storage");
            var users = await _userService.GetAllUsersAsync();
            _logger.LogInfo($"Returning {users.Count} users.");
            return Ok(users);
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            _logger.LogInfo("Fetching all the Users from the storage");
            var user = await _userService.GetUserAsync(id);
            return Ok(user);
        }



        // POST api/<UsersController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SaveUserPayload payload)
        {
            ValidationResult result = await _validator.ValidateAsync(payload);
            if (!result.IsValid)
            {
                return BadRequest(result);
            }            
            var response = await _userService.SaveUserAsync(payload);
            return Ok(response);
        }

        // PUT api/<UsersController>
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EditUserPayload payload)
        {
            ValidationResult result = await _validatorEdit.ValidateAsync(payload);
            if (!result.IsValid)
            {
                return BadRequest(result);
            }
            var response = await _userService.EditUserAsync(payload);
            return Ok(response);
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var response = await _userService.DeleteUserAsync(id);
            return Ok(response);
        }
    }
}
