using System.Collections.Generic;

namespace MuhuGame2018.Helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public _SmtpSettings SmtpSettings { get; set; }
        public _LodgingCounts LodgingCounts { get; set; }
        public _Costs Costs { get; set; }
        public IEnumerable<_AdminUser> AdminUsers { get; set; }

        public class _SmtpSettings
        {
            public string Host { get; set; }
            public int Port { get; set; }
            public string User { get; set; }
            public string Password { get; set; }
        }

        public class _LodgingCounts
        {
            public int Total { get; set; }
            public int Huts { get; set; }
            public int Buildings { get; set; }
        }

        public class _Costs
        {
            public int Starting { get; set; }
            public int Tshirt { get; set; }
            public int Hut { get; set; }
            public int Building { get; set; }
        }

        public class _AdminUser
        {
            public string Name { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }
    }
}
