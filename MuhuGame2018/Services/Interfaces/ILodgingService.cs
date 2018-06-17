﻿using MuhuGame2018.Entities;

namespace MuhuGame2018.Services.Interfaces
{
    public interface ILodgingService
    {
        void SendConfirmationEmails(User user, string password, LodgingValidationResult validationResult);
        void SendCostChangedEmails(User user, CostsSummary costsSummary);
    } 
}
