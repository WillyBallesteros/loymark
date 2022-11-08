using AutoMapper;
using Domain.DTOs;
using Domain.Entities;

namespace Services.MapperConfiguration
{
    public class LoymarkConfigProfile : Profile
    {
        public LoymarkConfigProfile()
        {
            
            CreateMap<Activity, ActivityDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<SaveUserPayload, User>()
                .ForMember(x => x.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(x => x.Lastname, opt => opt.MapFrom(s => s.Lastname))
                .ForMember(x => x.Email, opt => opt.MapFrom(s => s.Email))
                .ForMember(x => x.BirthDate, opt => opt.MapFrom(s => s.BirthDate))
                .ForMember(x => x.Phone, opt => opt.MapFrom(s => s.Phone))
                .ForMember(x => x.ResidenceCountry, opt => opt.MapFrom(s => s.ResidenceCountry))
                .ForMember(x => x.ReceiveInformation, opt => opt.MapFrom(s => s.ReceiveInformation))
                .ForMember(x => x.Id, opt => opt.Ignore());

            CreateMap<EditUserPayload, User>();

        }
        
    }
}
