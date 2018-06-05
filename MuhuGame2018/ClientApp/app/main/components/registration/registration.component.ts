import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../../../shared/_services';
import { Variant, User, VariantType, TShirt, TShirtType, Dinner, DinnerType, Member } from '../../../shared/_models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
    loading: boolean = false;
    temporaryDisabled: boolean = true;
    existingUser: boolean = false;
    subscription: Subscription;

    user: User;

    startingCost: number = 1200;
    tshirtCost: number = 250;

    lodgingCost: number;
    tshirtsCost: number;
    totalCost: number;

    variants: Variant[] = [
        new Variant(VariantType.Budova4, "V pokoji v budově (4 účastníci)"),
        new Variant(VariantType.Budova3, "V pokoji v budově (3 účastníci)"),
        new Variant(VariantType.Chatka4, "V chatce (4 účastníci)"),
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
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService
    ) {
        this.user = new User();

        // this.user.name = "Lamy"
        // this.user.login = "lamy";
        // this.user.email = "jiri.novak@petriny.net";
        // this.user.telephone = "123456";
        // this.user.password = "256314";
        // this.user.variant = VariantType.Chatka3;
        // this.user.members[0].name = "1";
        // this.user.members[1].name = "2";
        // this.user.members[2].name = "3";
    }

    ngOnInit(): void {
        this.subscription = this.route.params.subscribe(params => {
            let id = params['id'];

            if (id) {
                let s = this.userService.getById(id).subscribe(next => {
                    this.user = next;

                    this.existingUser = this.user != null;
                    this.updateParticipants(this.user.variant);

                    s.unsubscribe();
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    updateParticipants(event: VariantType): void {
        switch (event) {
            case VariantType.Chatka3:
            case VariantType.Budova3:
                this.user.members = this.user.members.filter(x => x.order <= 3);
                break;

            case VariantType.Budova4:
            case VariantType.Chatka4:
                if (this.user.members.length == 3) {
                    this.user.members.push(new Member(4))
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

        this.recalculateExpenses(this.user.variant);
    }

    private recalculateExpenses(event: VariantType) {
        let memberCount = this.user.members.length;
        let chatka = event == VariantType.Chatka3 || event == VariantType.Chatka4;
        let perMember = chatka ? 850 : 1000;

        this.user.members.forEach(m => {
            m.cost = perMember;

            if (m.tshirt) {
                m.cost += this.tshirtCost;
            }
        });

        this.lodgingCost = memberCount * perMember;
        this.tshirtsCost = this.user.members.reduce((sum, current) => sum + (current.tshirt ? 1 : 0) * this.tshirtCost, 0);
        this.totalCost = this.lodgingCost + this.tshirtsCost + this.startingCost;
    }

    register(): void {
        this.loading = true;

        if (!this.existingUser) {
            let s = this.userService.create(this.user)
                .subscribe(
                    data => {
                        this.alertService.success('Registrace proběhla úspěšně! Zkontrolujte prosím, že jste obdrželi potvrzující email...', true);
                        this.loading = false;
                        this.router.navigate(['/login']);
                        s.unsubscribe();
                    },
                    error => {
                        this.alertService.error(error._body);
                        this.loading = false;
                        s.unsubscribe();
                    });
        } else {
            let s = this.userService.update(this.user)
                .subscribe(
                    data => {
                        this.alertService.success('Údaje o vašem týmu byly úspěšně aktualizovány!', true);
                        this.loading = false;
                        s.unsubscribe();
                    },
                    error => {
                        this.alertService.error(error._body);
                        this.loading = false;
                        s.unsubscribe();
                    });
        }
    }
}
