import { Injectable } from "@angular/core";

@Injectable()
export class AppSettings {
    maxTeams: number = 36;
    tshirtCost: number = 250;
    hutCost: number = 850;
    buildingCost: number = 1000;
    startingCost: number = 1200;
};