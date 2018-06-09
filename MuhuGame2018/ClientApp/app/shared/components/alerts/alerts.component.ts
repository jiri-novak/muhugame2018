import { Component, OnInit, OnDestroy } from '@angular/core';

import { AlertService } from '../../_services/index';
import { Alert } from '../../_models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'alerts',
    templateUrl: 'alerts.component.html'
})

export class AlertsComponent implements OnInit, OnDestroy {
    dismissible: boolean = true;
    timeout: number = 10000;
    alerts: Alert[] = [];
    subscription: Subscription;

    constructor(private alertService: AlertService) { }

    ngOnInit(): void {
        this.subscription = this.alertService.getMessage().subscribe(message => { 
            if (!this.alerts.find(x => x && x.text == message.text)) {
                this.alerts.push(message); 
            }
        });
    }

    ngOnDestroy(): void {
        if (this.subscription)
            this.subscription.unsubscribe();
    }

    onClosed(dismissedAlert: Alert): void {
        this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    }
}