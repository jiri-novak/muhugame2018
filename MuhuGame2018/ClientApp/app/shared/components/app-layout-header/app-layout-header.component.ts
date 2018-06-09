import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageType, UserInfo } from '../../_models';
import { MessageService, AuthenticationService } from '../../_services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-layout-header',
    templateUrl: './app-layout-header.component.html',
    styleUrls: ['./app-layout-header.component.scss']
})
export class AppLayoutHeaderComponent implements OnInit, OnDestroy {
    isCollapsed: boolean = true;
    isAdmin: boolean = false;
    currentUser: UserInfo = null;
    subscription: Subscription;

    constructor(private messageService: MessageService, private authService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.currentUser = this.authService.getUserInfo();
        this.isAdmin = this.authService.isAdmin();

        this.subscription = this.messageService.getMessage().subscribe(message => { 
            if (message.type == MessageType.LoggedIn) {
                this.currentUser = this.authService.getUserInfo();
                this.isAdmin = this.authService.isAdmin();
            } else if (message.type == MessageType.LoggedOut) {
                this.currentUser = null;
                this.isAdmin = false;
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription)
            this.subscription.unsubscribe();
    }
}
