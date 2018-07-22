import { VariantType } from "./variant.type";

export class Variant {
    constructor(public id: VariantType, public name: string) {
    }

    public static available(): Variant[] {
        return [
            new Variant(VariantType.Budova3, "budova (3 účastníci)"),
            new Variant(VariantType.Budova4, "budova (4 účastníci)"),
            new Variant(VariantType.Chatka3, "chatka (3 účastníci)"),
            new Variant(VariantType.Chatka4, "chatka (4 účastníci)")
        ];
    }
}