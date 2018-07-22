export class ParticipantsSummary {
    teamsRegistered: number;
    teamsLimit: number;
    teamsOverLimit: number;
    teamsPaid: number;
    teamsQuited: number;

    inLimitMemberCount: number;
    inLimitDinner1Total: number;
    inLimitDinner1Counts: [string, number][];
    inLimitDinner2Total: number;
    inLimitDinner2Counts: [string, number][];
    inLimitTshirtTotal: number;
    inLimitTshirtCounts:  [string, number][];
    inLimitLodgingCounts: [string, number][];

    overLimitMemberCount: number;
    overLimitDinner1Total: number;
    overLimitDinner1Counts: [string, number][];
    overLimitDinner2Total: number;
    overLimitDinner2Counts: [string, number][];
    overLimitTshirtTotal: number;
    overLimitTshirtCounts:  [string, number][];
    overLimitLodgingCounts: [string, number][];
}