using MuhuGame2018.Entities;
using MuhuGame2018.Helpers;
using System;
using System.Collections.Concurrent;
using System.Linq;

namespace MuhuGame2018.Services
{
    public static class UserValidator
    {
        private static ConcurrentDictionary<int, User> _users;
        private static object _lock;

        private static readonly int Chatek = 28;
        private static readonly int Pokoju = 16;

        private static int UsedChatek = 0;
        private static int UsedPokoju = 0;
        private static int Total = 36;

        public static void Initialize(DataContext context)
        {
            _users = new ConcurrentDictionary<int, User>(context.Users.ToDictionary(x => x.Id, x => x));
            _lock = new object();

            UsedChatek = _users.Count(x => x.Value.Variant.StartsWith("Chatka"));
            UsedPokoju = _users.Count(x => x.Value.Variant.StartsWith("Budova"));
        }

        public static UserValidatorResult ValidateLodging(User user)
        {
            lock (_lock)
            {
                var result = new UserValidatorResult();

                _users.AddOrUpdate(user.Id, user, (key, oldValue) => user);

                result.Poradi = _users.Values.OrderBy(x => x.RegistrationDate).Where(x => x.Id == user.Id).Select((v, i) => new { Index = i+1 }).First().Index;
                result.Nahradnik = false;
                result.ChteneVChatce = user.Variant.StartsWith("Chatka");

                if (result.ChteneVChatce)
                {
                    if (UsedChatek + 1 <= Chatek)
                    {
                        // mam jeste chatku
                        ++UsedChatek;

                        result.PrirazenoChteneUbytovani = true;
                        result.PrirazenoVChatce = true;
                    }
                    else if (UsedPokoju + 1 <= Pokoju)
                    {
                        // mam jeste pokoj
                        ++UsedPokoju;

                        result.PrirazenoChteneUbytovani = false;
                        result.PrirazenoVChatce = false;
                    }
                }
                else
                {
                    if (UsedPokoju + 1 <= Pokoju)
                    {
                        // mam jeste pokoj
                        ++UsedPokoju;

                        result.PrirazenoChteneUbytovani = true;
                        result.PrirazenoVChatce = false;
                    }
                    else if (UsedChatek + 1 <= Chatek)
                    {
                        // mam jeste chatku
                        ++UsedChatek;

                        result.PrirazenoChteneUbytovani = false;
                        result.PrirazenoVChatce = true;
                    }
                }

                if (UsedChatek + UsedPokoju > Total)
                {
                    result.Nahradnik = true;
                }

                return result;
            }
        }
    }
}
