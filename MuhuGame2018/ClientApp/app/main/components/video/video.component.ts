import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'video-detail',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoComponent {
    @Input() src: string;
    @Input() type: string;
}