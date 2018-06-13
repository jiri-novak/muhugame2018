import { TShirtType } from ".";

export class TShirt {
    constructor(public id: TShirtType, public name: string) {
    }

    public static available(): TShirt[] {
        return [
            new TShirt(TShirtType.MenS, "Pánské S"),
            new TShirt(TShirtType.MenM, "Pánské M"),
            new TShirt(TShirtType.MenL, "Pánské L"),
            new TShirt(TShirtType.MenXL, "Pánské XL"),
            new TShirt(TShirtType.MenXXL, "Pánské XXL"),
            new TShirt(TShirtType.WomenS, "Dámské S"),
            new TShirt(TShirtType.WomenM, "Dámské M"),
            new TShirt(TShirtType.WomenL, "Dámské L"),
            new TShirt(TShirtType.WomenXL, "Dámské XL")
        ];
    }
}