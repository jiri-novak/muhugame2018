import { DinnerType } from "./dinner.type";

export class Dinner {
    constructor(public id: DinnerType, public name: string) {
    }

    public static available(): Dinner[] {
        return [
            new Dinner(DinnerType.Rizek, "vepřový/kuřecí řízek, brambory"),
            new Dinner(DinnerType.OvocneKnedliky, "ovocné knedlíky se smetanovou polevou"),
            new Dinner(DinnerType.KnedloVepro, "knedlo-vepřo-zelo/špenát"),
            new Dinner(DinnerType.FrancouzskeBrambory, "francouzské brambory se zeleninou")
        ];
    }
}