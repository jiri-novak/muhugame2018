import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { User } from '../../../shared/_models';
import { ParticipantsComponent } from '../participants/participants.component';
import { Subject, Subscription } from 'rxjs';
import { ParticipantsSummary } from '../../_models';

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
    selected: User = new User();
    summarySubscription: Subscription;
    summary: ParticipantsSummary;

    @ViewChild('participants') participants: ParticipantsComponent;

    constructor() {
    }

    teamSelected(user: User) {
        console.log(`selected ${user.name}`);
        this.selected = user;
    }

    ngAfterViewInit() {

    }

    ngOnInit(): void {
        this.summarySubscription = this.participants.summary.subscribe(x => {
            this.summary = x;
        });
    }

    ngOnDestroy(): void {
        if (this.summarySubscription) {
            this.summarySubscription.unsubscribe();
        }
    }
}
