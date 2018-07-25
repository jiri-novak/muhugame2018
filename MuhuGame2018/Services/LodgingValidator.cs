using Microsoft.Extensions.Options;
using MuhuGame2018.Entities;
using MuhuGame2018.Helpers;
using System.Collections.Concurrent;
using System.Linq;

namespace MuhuGame2018.Services
{
    public static class LodgingValidator
    {
        private static int UsedHuts = 0;
        private static int UsedBuildings = 0;

        private static int TotalCount;
        private static int HutsCount;
        private static int BuildingsCount;

        private static int TshirtCost;
        private static int StartingCost;
        private static int HutCost;
        private static int BuildingCost;

        private static ConcurrentDictionary<int, User> _users;
        private static object _lock = new object();

        public static void Initialize(IUserRepository userRepository, IOptions<AppSettings> appSettings)
        {
            _users = new ConcurrentDictionary<int, User>(userRepository.GetAll().ToDictionary(x => x.Id, x => x));

            UsedHuts = _users.Count(x => x.Value.Variant.StartsWith("Chatka"));
            UsedBuildings = _users.Count(x => x.Value.Variant.StartsWith("Budova"));

            TotalCount = appSettings.Value.LodgingCounts.Total;
            HutsCount = appSettings.Value.LodgingCounts.Huts;
            BuildingsCount = appSettings.Value.LodgingCounts.Buildings;

            TshirtCost = appSettings.Value.Costs.Tshirt;
            StartingCost = appSettings.Value.Costs.Starting;
            HutCost = appSettings.Value.Costs.Hut;
            BuildingCost = appSettings.Value.Costs.Building;
        }

        public static LodgingValidationResult Validate(IUserRepository userRepository, IOptions<AppSettings> appSettings, User user)
        {
            lock (_lock)
            {
                if (_users == null)
                {
                    Initialize(userRepository, appSettings);
                }

                var result = new LodgingValidationResult();

                _users.AddOrUpdate(user.Id, user, (key, oldValue) => user);

                result.Order = _users.Values.OrderBy(x => x.RegistrationDate).Select((v, i) => new { v.Id, Index = i + 1 }).First(x => x.Id == user.Id).Index;
                result.OverLimit = false;

                if (IsHutPreffered(user.Variant))
                {
                    if (UsedHuts + 1 <= HutsCount) // still have hut
                    {
                        ++UsedHuts;

                        result.DesiredLodgingAssigned = true;
                        result.HutAssigned = true;
                    }
                    else if (UsedBuildings + 1 <= BuildingsCount) // still have building
                    {
                        ++UsedBuildings;

                        result.DesiredLodgingAssigned = false;
                        result.HutAssigned = false;
                    }
                }
                else
                {
                    if (UsedBuildings + 1 <= BuildingsCount) // still have building
                    {
                        ++UsedBuildings;

                        result.DesiredLodgingAssigned = true;
                        result.HutAssigned = false;
                    }
                    else if (UsedHuts + 1 <= HutsCount) // still have hut
                    {
                        ++UsedHuts;

                        result.DesiredLodgingAssigned = false;
                        result.HutAssigned = true;
                    }
                }

                if (UsedHuts + UsedBuildings >= TotalCount)
                {
                    result.OverLimit = true;
                }
                else if (!result.DesiredLodgingAssigned)
                {
                    int memberCount = user.Members.Count;
                    int memberLodging = result.HutAssigned ? 850 : 1000;

                    if (result.HutAssigned)
                    {
                        user.Variant = memberCount == 3 ? "Chatka3" : "Chatka4";
                    }
                    else
                    {
                        user.Variant = memberCount == 3 ? "Budova3" : "Budova4";
                    }

                    foreach (var m in user.Members)
                        m.Cost = memberLodging + TshirtCost * (m.Tshirt == null ? 0 : 1);

                    userRepository.Update(user);
                }

                result.Costs = CalculateCosts(appSettings, user);

                return result;
            }
        }

        public static CostsSummary CalculateCosts(IOptions<AppSettings> appSettings, User user)
        {
            return new CostsSummary(
                StartingCost,
                user.Members.Count * (IsBuildingPreffered(user.Variant) ? BuildingCost : HutCost),
                user.Members.Count(x => x.Tshirt != null) * TshirtCost
            );
        }

        private static bool IsBuildingPreffered(string variant)
        {
            return variant.StartsWith("Budova");
        }

        private static bool IsHutPreffered(string variant)
        {
            return variant.StartsWith("Chatka");
        }
    }

    public class LodgingValidationResult
    {
        public int Order { get; set; }
        public bool OverLimit { get; set; }

        public bool DesiredLodgingAssigned { get; set; }
        public bool HutAssigned { get; set; }

        public CostsSummary Costs { get; set; }
    }

    public class CostsSummary
    {
        public CostsSummary(int startingCost, int lodgingCost, int tshirtCost)
        {
            StartingCost = startingCost;
            LodgingCost = lodgingCost;
            TshirtCost = tshirtCost;
        }

        public int StartingCost { get; }
        public int LodgingCost { get; }
        public int TshirtCost { get; }

        public int TotalCost => StartingCost + LodgingCost + TshirtCost;
    }
}
