import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService, MessageService, AuthenticationService } from '../../../shared/_services';
import { Variant, User, VariantType, TShirt, TShirtType, Dinner, DinnerType, Member, MessageType } from '../../../shared/_models';
import { Subscription } from 'rxjs';
import { AppSettings } from '../../../app.settings';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
    private _user: User = new User();

    @Input('user')
    get user(): User {
        return this._user;
    }
    set user(value: User) {
        this._user = value;
        this.existingUser = !!value && !!value.id && value.id != 0;
        this.isAdmin = this.authService.isAdmin();
        if (value) {
            this.updateParticipants(value.variant);
        }
        this.initVariants();
    }

    @Input() simplified: boolean = false;

    loading: boolean = false;
    isBusy: boolean = false;
    isAdmin: boolean = false;
    temporaryDisabled: boolean = false;
    existingUser: boolean = false;

    subscription: Subscription;

    lodgingCost: number;
    tshirtsCost: number;
    totalCost: number;

    variants: Variant[] = [];

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
        private appSettings: AppSettings,
        private messageService: MessageService,
        private authService: AuthenticationService
    ) {
    }

    ngOnInit(): void {
        if (!this.simplified) {
            this.UpdateUser();
        }

        this.subscription = this.messageService.getMessage().subscribe(message => {
            if (message.type == MessageType.LoggedIn) {
                this.UpdateUser();
            } else if (message.type == MessageType.LoggedOut) {
                this.UpdateUser();
            }
        });
    }
    
    ngOnDestroy(): void {
        if (this.subscription)
            this.subscription.unsubscribe();
    }

    private UpdateUser(): void {
        this.isBusy = true;

        let userId: number = this.authService.getUserId();

        if (!!userId && userId != 0) {
            let s = this.userService.getById(userId).subscribe(x => {
                if (!x) {
                    this.user = new User();
                } else {
                    this.user = x;
                }
                this.isBusy = false;
                s.unsubscribe();
            });
        }
        else {
            this.user = new User();
            this.isBusy = false;
        }
    }

    private initVariants(): void {
        this.variants = [];
        this.variants.push(new Variant(VariantType.Budova4, "V pokoji v budově (4 účastníci)"));
        if (this.existingUser) {
            this.variants.push(new Variant(VariantType.Budova3, "V pokoji v budově (3 účastníci)"));
        }
        this.variants.push(new Variant(VariantType.Chatka4, "V chatce (4 účastníci)"));
        this.variants.push(new Variant(VariantType.Chatka3, "V chatce (3 účastníci)"));
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
        if (event) {
            member.cost += this.appSettings.tshirtCost;
        }
        else {
            member.cost -= this.appSettings.tshirtCost;
        }

        this.recalculateExpenses(this.user.variant);
    }

    private recalculateExpenses(event: VariantType) {
        let memberCount = this.user.members.length;
        let chatka = event == VariantType.Chatka3 || event == VariantType.Chatka4;
        let perMember = chatka ? this.appSettings.hutCost : this.appSettings.buildingCost;

        this.user.members.forEach(m => {
            m.cost = perMember;

            if (m.tshirt) {
                m.cost += this.appSettings.tshirtCost;
            }
        });

        this.lodgingCost = memberCount * perMember;
        this.tshirtsCost = this.user.members.reduce((sum, current) => sum + (current.tshirt ? 1 : 0) * this.appSettings.tshirtCost, 0);
        this.totalCost = this.lodgingCost + this.tshirtsCost + this.appSettings.startingCost;
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
                        this.alertService.success(`Údaje o týmu ${this.user.name} byly úspěšně aktualizovány!`, true);
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
