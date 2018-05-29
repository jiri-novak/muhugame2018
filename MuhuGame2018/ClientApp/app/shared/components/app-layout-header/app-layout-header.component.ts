import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../_models';
import { MessageService } from '../../_services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-layout-header',
    templateUrl: './app-layout-header.component.html',
    styleUrls: ['./app-layout-header.component.scss']
})
export class AppLayoutHeaderComponent implements OnInit, OnDestroy {
    isCollapsed: boolean = true;
    currentUser: User;
    subscription: Subscription;

    constructor(private messageService: MessageService) {
    }

    ngOnInit(): void {
        this.subscription = this.messageService.getMessage().subscribe(message => { 
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));    
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
