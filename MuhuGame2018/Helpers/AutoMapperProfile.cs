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

            CreateMap<AppSettings, AppSettingsDto>()
                .ForMember(d => d.BuildingCost, s => s.MapFrom(f => f.Costs.Building))
                .ForMember(d => d.HutCost, s => s.MapFrom(f => f.Costs.Hut))
                .ForMember(d => d.StartingCost, s => s.MapFrom(f => f.Costs.Starting))
                .ForMember(d => d.TshirtCost, s => s.MapFrom(f => f.Costs.Tshirt))
                .ForMember(d => d.MaxTeams, s => s.MapFrom(f => f.LodgingCounts.Total));
        }
    }
}
