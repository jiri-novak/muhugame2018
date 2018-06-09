import { Component, Input } from "@angular/core";

@Component({
    selector: 'busy-indicator',
    templateUrl: './busy.indicator.component.html',
    styleUrls: ['./busy.indicator.component.scss']
})
export class BusyIndicatorComponent {
    @Input() isBusy: boolean;
}