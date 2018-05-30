import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
    selector: 'video-detail',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoComponent {
    @Input() src: string;// = "/assets/videos/press-conf-720p.mp4";
    @Input() type: string;// = "video/mp4";
}