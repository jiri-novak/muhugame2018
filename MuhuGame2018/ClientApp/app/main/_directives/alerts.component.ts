import { Component, OnInit } from '@angular/core';

import { AlertService } from '../_services/index';
import { Message } from '../_models';

@Component({
    selector: 'alerts',
    templateUrl: 'alerts.component.html'
})

export class AlertsComponent {
    dismissible = true;
    alerts: Message[] = [];

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.alerts.push(message); });
    }

    onClosed(dismissedAlert: Message): void {
        this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
    }
}