import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'video-detail',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoComponent{
    sources: Array<Object>;
    private subscription: Subscription;

    constructor(private route: ActivatedRoute) {
        this.sources = [
            {
                src: "/assets/videos/press-conf-720p.mp4",
                type: "video/mp4"
            }
        ];
    }

    ngOnInit() {
        // Subscribe to route params
        this.subscription = this.route.params.subscribe(params => {
          let id = params['id'];
          console.log(id);
      });
    }

    ngOnDestroy() {
        // Clean sub to avoid memory leak
      this.subscription.unsubscribe();
    }
}
