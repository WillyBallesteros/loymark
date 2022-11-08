using AutoMapper;
using Data;
using Domain.DTOs;
using Domain.Entities;
using Domain.Handlers;
using Microsoft.EntityFrameworkCore;

namespace Services.UserService
{
    public class UserService : IUserService
    {
        private readonly ILoymarkDbContext _context;
        private readonly IMapper _mapper;

        public UserService(ILoymarkDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ResponsePackage<bool>> SaveUserAsync(SaveUserPayload payload) 
        {
            var response = new ResponsePackage<bool>();
            var cancellationToken = new CancellationToken();            
            payload.Activities.Add(new ActivityDto
            {
                Observation = "Creación de Usuario"
            });

            var user = _mapper.Map<User>(payload);            
            await _context!.Users!.AddAsync(user, cancellationToken);          
            await _context.SaveChangesAsync(cancellationToken);

            response.Message = "El usuario fue guardado correctamente";
            response.Result = true;
            return response;
        }

        public async Task<ResponsePackage<bool>> EditUserAsync(EditUserPayload payload)
        {
            var response = new ResponsePackage<bool>();
            var cancellationToken = new CancellationToken();

            var user = await _context!.Users!.FirstOrDefaultAsync(x => x.Id == payload.Id);

            if (user == null)
            {
                response.Message = $"El usuario {payload.Name} {payload.Lastname} no existe";
                response.Result = false;
                return response;
            }

            _mapper.Map(payload, user);

            await _context!.Activities!.AddAsync(new Activity
            {
                Observation = "Actualización de Usuario",
                UserId = payload.Id,
            }, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            response.Message = "El usuario fue actualizado correctamente";
            response.Result = true;
            return response;
        }

        public async Task<List<UserDto>> GetAllUsersAsync()
        {
            var users = await _context!.Users!.Include(x => x.Activities).AsNoTracking().ToListAsync();
            var usersDto = _mapper.Map<List<UserDto>>(users);
            return usersDto;
        }

        public async Task<UserDto> GetUserAsync(int id)
        {
            var user = await _context!.Users!.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }

        public async Task<ResponsePackage<bool>> DeleteUserAsync(int id)
        {
            var response = new ResponsePackage<bool>();
            var cancellationToken = new CancellationToken();

            var user = await _context!.Users!.Include(x => x.Activities).FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
            {
                response.Message = $"El usuario con Id: {id} no existe";
                response.Result = false;
                return response;
            }

            if (user!.Activities!.Any())
            {
                _context!.Activities!.RemoveRange(user!.Activities);
            }
            _context.Remove(user);
                                  
            await _context.SaveChangesAsync(cancellationToken);

            response.Message = $"El usuario {user.Name} {user.Lastname} fue eliminado correctamente";
            response.Result = true;
            return response;
        }
    }
}
