import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Video } from '../../_models';
import { Meta, DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit, OnDestroy {
    sources: Array<Video>;
    private subscription: Subscription;

    private pressConference: Video = new Video("/assets/videos/press-conf-720p.mp4", "/assets/videos/press-conf-720p.png", "video/mp4", "Video z tiskové konference u příležitosti zakoupení Zóny:");
    private zoneTeaser: Video = new Video("/assets/videos/zone-teaser-720p.mp4", "/assets/videos/zone-teaser-720p.png", "video/mp4", "Víkendový pobyt v Zóně s piknikem:");
    private aboutZone: Video = new Video("/assets/videos/about-zone-720p.mp4", "/assets/videos/about-zone-720p.png", "video/mp4", "Vše co jste chtěli vědět o Zóně");

    constructor(private route: ActivatedRoute, private meta: Meta) {
    }

    ngOnInit() {        
        this.subscription = this.route.params.subscribe(params => {
            let id = params['id'];

            switch (id) {
                case 'press-conference':
                    this.sources = [
                        this.pressConference
                    ];
                    this.addToHeaders(this.pressConference, 1280, 720);
                    break;

                case 'zone-teaser':
                    this.sources = [
                        this.zoneTeaser
                    ];
                    this.addToHeaders(this.zoneTeaser, 1280, 720);
                    break;

                case 'about-zone':
                    this.sources = [
                        this.aboutZone
                    ];
                    this.addToHeaders(this.aboutZone, 720, 576);
                    break;

                default:
                    this.sources = [
                        this.aboutZone,
                        this.zoneTeaser,
                        this.pressConference
                    ];
                    break;
            }
        });
    }

    private addToHeaders(video: Video, width: number, height: number): void {
        this.meta.addTag({ name: "og:site_name", content: "MuhuGame 2018"});
        this.meta.addTag({ name: "og:type", content: "video"});
        this.meta.addTag({ name: "og:video", content: `${window.location.origin}${video.src}`});
        this.meta.addTag({ name: "og:url", content: `${window.location.href}`});
        this.meta.addTag({ name: "og:title", content: video.title})
        this.meta.addTag({ name: "og:description", content: video.title});
        this.meta.addTag({ name: "og:image", content: `${window.location.origin}${video.img}`});
        this.meta.addTag({ name: "og:image:secure_url", content: `${window.location.origin}${video.img}`});
        this.meta.addTag({ name: "og:image:type", content: "image/png"});
        this.meta.addTag({ name: "og:image:width", content: `${width}`});
        this.meta.addTag({ name: "og:image:height", content: `${height}`});
    }

    ngOnDestroy() {
        if (this.subscription)
            this.subscription.unsubscribe();
    }
}
