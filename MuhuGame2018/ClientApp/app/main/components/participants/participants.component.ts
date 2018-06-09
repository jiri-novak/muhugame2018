import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../shared/_services';
import { Subscription } from 'rxjs';
import { User } from '../../../shared/_models';
import { AppSettings } from '../../../app.settings';

@Component({
    selector: 'participants',
    templateUrl: './participants.component.html',
    styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit, OnDestroy {
    @Input() simplified: boolean = false;
    @Input() isReadOnly: boolean = true;

    @Output() selected = new EventEmitter<User>();

    isBusy: boolean = false;
    users: User[];
    teams: number;
    members: number;

    subscription: Subscription;

    selectedRow: number;
    setClickedRow: Function;

    constructor(private userService: UserService, private appSettings: AppSettings) {
        this.setClickedRow = function (index) {
            this.selectedRow = index;
            this.selected.emit(this.users[index]);
        }
    }

    ngOnInit(): void {
        this.isBusy = true;
        this.subscription = this.userService.getAll().subscribe(next => {
            this.users = next;

            if (this.users.length > 0)
                this.setClickedRow(0);

            this.teams = this.users.length;
            this.members = 0;

            for (let user of this.users) {
                for (let member of user.members) {
                    this.members += 1;
                }
            }

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
