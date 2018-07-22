import { Member } from "./members";
import { VariantType } from ".";

export class User {
    id: number;

    name: string;
    email: string;
    telephone: string;

    variant: VariantType;

    registrationDate: Date;

    paid: boolean;
    quited: boolean;

    index?: number;

    note: string;

    members: Member[] = [
        new Member(1),
        new Member(2),
        new Member(3),
        new Member(4)
    ];
}