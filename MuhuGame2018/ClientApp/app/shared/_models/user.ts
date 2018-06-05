import { Member } from "./members";
import { VariantType } from ".";

export class User {
    id: number;
    name: string;

    login: string;
    password: string;

    email: string;
    telephone: string;

    variant: VariantType;

    registrationDate: Date;

    note: string;

    members: Member[] = [
        new Member(1),
        new Member(2),
        new Member(3),
        new Member(4)
    ];
}