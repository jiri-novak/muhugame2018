using System;
using System.Collections.Generic;

namespace MuhuGame2018.Entities
{

    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public string Variant { get; set; }

        public string Note { get; set; }

        public DateTime RegistrationDate { get; set; }

        public bool Paid { get; set; }
        public bool Quited { get;set; }

        public IList<Member> Members { get; set; }
    }
}
