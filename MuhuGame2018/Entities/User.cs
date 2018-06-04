using System.Collections.Generic;

namespace MuhuGame2018.Entities
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Login { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public string Email { get; set; }
        public string Telephone { get; set; }

        public string Variant { get; set; }

        public string Note { get; set; }

        public IEnumerable<Member> Members { get; set; }
    }
}
