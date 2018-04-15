import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaComponent{
    sources: Array<Object>;

    constructor() {
        this.sources = [
            {
                src: "/assets/videos/press-conf-720p.mp4",
                type: "video/mp4"
            }
        ];
    }

    ngOnInit() {
    }
}
