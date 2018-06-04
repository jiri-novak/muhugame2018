using AutoMapper;
using MuhuGame2018.DTO;
using MuhuGame2018.Entities;

namespace MuhuGame2018.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<Member, MemberDto>();

            CreateMap<UserDto, User>();
            CreateMap<MemberDto, Member>();
        }
    }
}
