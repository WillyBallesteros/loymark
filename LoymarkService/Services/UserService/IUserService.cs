using Domain.DTOs;
using Domain.Handlers;

namespace Services.UserService
{
    public interface IUserService
    {
        Task<ResponsePackage<bool>> SaveUserAsync(SaveUserPayload saveUserPayload);
        Task<ResponsePackage<bool>> EditUserAsync(EditUserPayload editUserPayload);
        Task<ResponsePackage<bool>> DeleteUserAsync(int id);
        Task<UserDto> GetUserAsync(int id);
        Task<List<UserDto>> GetAllUsersAsync();
    }
}
