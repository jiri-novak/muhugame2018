export class ParticipantsSummary {
    teamsRegistered: number;
    teamsLimit: number;
    teamsOverLimit: number;
    teamsPaid: number;

    inLimitMemberCount: number;
    inLimitDinner1Counts: [string, number][];
    inLimitDinner2Counts: [string, number][];
    inLimitTshirtCounts:  [string, number][];

    overLimitMemberCount: number;
    overLimitDinner1Counts: [string, number][];
    overLimitDinner2Counts: [string, number][];
    overLimitTshirtCounts:  [string, number][];
}