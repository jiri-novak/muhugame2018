import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { UserService } from '../../../shared/_services';
import { Subscription } from 'rxjs';
import { User } from '../../../shared/_models';

@Component({
    selector: 'participants',
    templateUrl: './participants.component.html',
    styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit, OnDestroy {
    private users: User[];
    private teams: number;
    private members: number;

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        let s = this.userService.getAll().subscribe(next => {
            this.users = next;

            this.teams = this.users.length;
            this.members = 0;
            
            for (let user of this.users) {
                for (let member of user.members) {
                    this.members += 1;
                }
            }

            s.unsubscribe();
        });
    }

    ngOnDestroy(): void {
    }
}
