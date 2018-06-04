import { DinnerType, TShirtType } from ".";

export class Member {
    constructor(
        public order: number,
        public name?: string, 
        public tshirt?: TShirtType,
        public dinner1?: DinnerType,
        public dinner2?: DinnerType,
        public cost?: number
    ){
    }
}