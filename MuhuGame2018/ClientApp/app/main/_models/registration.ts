import { Variant } from "./variant";
import { VariantType, Member } from ".";

export class Registration {
    variant: VariantType = VariantType.Budova4;

    members: Member[] = [
        new Member(1),
        new Member(2),
        new Member(3),
        new Member(4)
    ];
}