import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../../../shared/_services';
import { Team, Variant, VariantType, Registration, Member, Dinner, DinnerType, TShirt, TShirtType } from '../../_models';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
    loading: boolean = false;
    temporaryDisabled: boolean = false;

    team: Team = new Team();

    registration: Registration = new Registration();

    startingCost: number = 1200;
    tshirtCost: number = 250;

    lodgingCost: number;
    tshirtsCost: number;
    totalCost: number;

    variants: Variant[] = [
        new Variant(VariantType.Budova4, "V pokoji v budově (4 účastníci)"),
        new Variant(VariantType.Chatka4, "V chatce (4 účastníci)"),
        new Variant(VariantType.Budova3, "V pokoji v budově (3 účastníci)"),
        new Variant(VariantType.Chatka3, "V chatce (3 účastníci)")
    ];

    tshirts: TShirt[] = [
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

    dinner1: Dinner[] = [
        new Dinner(DinnerType.Rizek, "vepřový/kuřecí řízek, brambory"),
        new Dinner(DinnerType.OvocneKnedliky, "ovocné knedlíky se smetanovou polevou")
    ];

    dinner2: Dinner[] = [
        new Dinner(DinnerType.KnedloVepro, "knedlo-vepřo-zelo/špenát"),
        new Dinner(DinnerType.FrancouzskeBrambory, "francouzské brambory se zeleninou")
    ];

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
    ) {
        this.updateParticipants(this.registration.variant);
    }

    updateParticipants(event: VariantType): void {
        switch (event) {
            case VariantType.Budova3:
            case VariantType.Chatka3:
                this.registration.members = this.registration.members.filter(x => x.order <= 3);
                break;

            case VariantType.Budova4:
            case VariantType.Chatka4:
                if (this.registration.members.length == 3) {
                    this.registration.members.push(new Member(4))
                }
                break;
        }

        this.recalculateExpenses(event);
    }

    updateTShirt(member: Member, event: TShirtType): void {
        console.log(TShirtType);

        if (event) {
            member.cost += this.tshirtCost;
        }
        else {
            member.cost -= this.tshirtCost;
        }

        this.recalculateExpenses(this.registration.variant);
    }

    private recalculateExpenses(event: VariantType) {
        let memberCount = this.registration.members.length;
        let chatka = event == VariantType.Chatka3 || event == VariantType.Chatka4;
        let perMember = chatka ? 850 : 1000;

        this.registration.members.forEach(m => {
            m.cost = perMember;
            
            if (m.tshirt) {
                m.cost += this.tshirtCost;
            }
        });

        this.lodgingCost = memberCount * perMember;
        this.tshirtsCost = this.registration.members
            .reduce((sum, current) => sum + (current.tshirt ? 1 : 0) * this.tshirtCost, 0);
        this.totalCost = this.lodgingCost + this.tshirtsCost + this.startingCost;
    }

    register(): void {
        //this.loading = true;

        console.log(this.registration);
        // this.userService.create(this.team)
        //     .subscribe(
        //         data => {
        //             this.alertService.success('Registration successful', true);
        //             this.router.navigate(['/login']);
        //         },
        //         error => {
        //             this.alertService.error(error._body);
        //             this.loading = false;
        //         });
    }
}
