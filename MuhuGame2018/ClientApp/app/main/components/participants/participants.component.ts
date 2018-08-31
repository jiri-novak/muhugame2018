import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../shared/_services';
import { Subscription } from 'rxjs';
import { User, Member, DinnerType, Dinner, TShirt, Variant } from '../../../shared/_models';
import { AppSettings } from '../../../app.settings';
import { ParticipantsSummary } from '../../_models';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
    selector: 'participants',
    templateUrl: './participants.component.html',
    styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit, OnDestroy {
    @Input() simplified: boolean = false;
    @Input() isReadOnly: boolean = true;

    @Output() selected = new EventEmitter<User>();

    private summarySubject: Subject<ParticipantsSummary> = new Subject<ParticipantsSummary>();
    public summary: Observable<ParticipantsSummary> = this.summarySubject.asObservable();

    isBusy: boolean = false;
    users: User[] = [];
    teams: number = 0;
    members: number = 0;

    subscription: Subscription;

    selectedRow: number;
    setClickedRow: Function;

    constructor(private userService: UserService, private appSettings: AppSettings) {
        this.setClickedRow = function (index) {
            this.selectedRow = index;
            this.selected.emit(this.users[index]);
        }
    }

    private getSummary(): ParticipantsSummary {
        let summary = new ParticipantsSummary();

        summary.teamsLimit = this.appSettings.maxTeams;
        summary.teamsRegistered = this.users.filter(x => !x.quited).length;
        summary.teamsOverLimit = Math.max(summary.teamsRegistered - summary.teamsLimit, 0);
        summary.teamsPaid = this.users.filter(x => x.paid).length;
        summary.teamsQuited = this.users.filter(x => x.quited).length;

        let inLimitUsers = new Array<User>();
        let inLimitMembers = new Array<Member>();
        for (let team of this.users.filter(x => x.index <= this.appSettings.maxTeams && !x.quited)) {
            inLimitUsers.push(team);
            for (let member of team.members) {
                inLimitMembers.push(member);
            }
        }

        summary.inLimitMemberCount = inLimitMembers.length;
        summary.inLimitDinner1Counts = this.getMap(_(inLimitMembers).countBy(x => this.dinners(x.dinner1)).value());
        summary.inLimitDinner1Total = this.getSelectedCount(summary.inLimitDinner1Counts);
        summary.inLimitDinner2Counts = this.getMap(_(inLimitMembers).countBy(x => this.dinners(x.dinner2)).value());
        summary.inLimitDinner2Total = this.getSelectedCount(summary.inLimitDinner2Counts);
        summary.inLimitTshirtCounts = this.getMap(_(inLimitMembers).countBy(x => this.tshirts(x.tshirt)).value());
        summary.inLimitTshirtTotal = this.getSelectedCount(summary.inLimitTshirtCounts);
        summary.inLimitLodgingCounts = this.getMap(_(inLimitUsers).countBy(x => this.variants(x.variant)).value());

        let overLimitUsers = new Array<User>();
        let overLimitMembers = new Array<Member>();
        for (let team of this.users.filter(x => x.index > this.appSettings.maxTeams && !x.quited)) {
            overLimitUsers.push(team);
            for (let member of team.members) {
                overLimitMembers.push(member);
            }
        }

        summary.overLimitMemberCount = overLimitMembers.length;
        summary.overLimitDinner1Counts = this.getMap(_(overLimitMembers).countBy(x => this.dinners(x.dinner1)).value());
        summary.overLimitDinner1Total = this.getSelectedCount(summary.overLimitDinner1Counts);
        summary.overLimitDinner2Counts = this.getMap(_(overLimitMembers).countBy(x => this.dinners(x.dinner2)).value());
        summary.overLimitDinner2Total = this.getSelectedCount(summary.overLimitDinner2Counts);
        summary.overLimitTshirtCounts = this.getMap(_(overLimitMembers).countBy(x => this.tshirts(x.tshirt)).value());
        summary.overLimitTshirtTotal = this.getSelectedCount(summary.overLimitTshirtCounts);
        summary.overLimitLodgingCounts = this.getMap(_(overLimitUsers).countBy(x => this.variants(x.variant)).value());

        return summary;
    }

    private notSelected: string = '<nevybráno>';

    private dinners(short: string) {
        let found: Dinner =  Dinner.available().find(x => x.id == short);
        let long: string = found ? found.name : short;
        if (!long)
            long = this.notSelected;
        return long;
    }

    private tshirts(short: string) {
        let found: TShirt = TShirt.available().find(x => x.id == short);
        let long: string = found ? found.name : short;
        if (!long)
            long = this.notSelected;
        return long;
    }

    private variants(short: string) {
        let found: Variant = Variant.available().find(x => x.id == short);
        let long: string = found ? found.name : short;
        if (!long)
            long = this.notSelected;
        return long;
    }

    private getSelectedCount(counts: [string, number][]): number {
        return counts.filter(x => x["0"] != this.notSelected).map(x => x["1"]).reduce((sum, current) => sum + current, 0);
    }

    private getMap(dict: _.Dictionary<number>): [string, number][] {
        let map: [string, number][] = [];

        _.forEach(dict, (value, key) => {
            map.push([key, value]);
        });

        map = map.sort((a: [string, number], b: [string, number]) => {
            if (a[1] == b[1]) {
                return 0;
            } else {
                if (a[1] > b[1])
                    return -1;
                else
                    return 1;
            }
        });

        return map;
    }

    ngOnInit(): void {
        this.isBusy = true;
        this.subscription = this.userService.getAll().subscribe(next => {
            this.users = next;

            if (this.users.length > 0)
                this.setClickedRow(0);

            this.teams = this.users.length;
            this.members = 0;

            let i = 1;
            for (let user of this.users) {
                if (!user.quited) {
                    user.index = i++;

                    for (let member of user.members) {
                        this.members += 1;
                    }
                }
            }

            this.summarySubject.next(this.getSummary());

            this.isBusy = false;
        }, err => {
            this.isBusy = false;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription)
            this.subscription.unsubscribe();
    }
}
