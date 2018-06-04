using System.Collections.Generic;

namespace MuhuGame2018.DTO
{
    public class UserDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Login { get; set; }
        public string Password { get; set; }

        public string Email { get; set; }
        public string Telephone { get; set; }

        public string Variant { get; set; }

        public string Note { get; set; }

        public IEnumerable<MemberDto> Members { get; set; }
    }
}
