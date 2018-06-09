import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Video } from '../../_models';

@Component({
    selector: 'media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit, OnDestroy {
    sources: Array<Video>;
    private subscription: Subscription;

    private pressConference: Video = new Video("/assets/videos/press-conf-720p.mp4", "video/mp4", "Video z tiskové konference u příležitosti zakoupení Zóny:");
    private zoneTeaser: Video = new Video("/assets/videos/zone-teaser-720p.mp4", "video/mp4", "Víkendový pobyt v Zóně s piknikem:");

/*
<meta property="og:site_name" content="Vimeo">
<meta property="og:url" content="https://vimeo.com/228891505">
<meta property="og:type" content="video">
<meta property="og:title" content="Kyrgystan &amp; Kazachstan 2017">
<meta property="og:description" content="Trekking and wandering. Terskey Alatau, Song Kul, Kul Ukok, Ala Archa, Almaty.">
<meta property="og:updated_time" content="2018-03-17T23:17:48-04:00">
<meta property="og:image" content="https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F649061989_1280x720.webp&src1=https%3A%2F%2Ff.vimeocdn.com%2Fimages_v6%2Fshare%2Fplay_icon_overlay.png">
<meta property="og:image:secure_url" content="https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F649061989_1280x720.webp&src1=https%3A%2F%2Ff.vimeocdn.com%2Fimages_v6%2Fshare%2Fplay_icon_overlay.png">
<meta property="og:image:type" content="image/jpg">
<meta property="og:image:width" content="1280">
<meta property="og:image:height" content="720">
*/

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            let id = params['id'];

            switch (id) {
                case 'press-conference':
                    this.sources = [
                        this.pressConference
                    ];
                    break;
                case 'zone-teaser':
                    this.sources = [
                        this.zoneTeaser
                    ];
                    break;
                default:
                    this.sources = [
                        this.zoneTeaser,
                        this.pressConference
                    ];
                    break;
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }
}
