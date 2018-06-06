import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { PlatformLocation } from '@angular/common';

@Component({
    selector: 'video-detail',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoComponent {
    @Input() src: string;
    @Input() type: string;

    constructor(private meta: Meta, private platformLocation: PlatformLocation) {
        this.meta.addTag({ name: 'og:site_name', content: 'MuhuGame 2018'});
        this.meta.addTag({ name: 'og:url', content: this.platformLocation.getBaseHrefFromDOM()})
        this.meta.addTag({ name: 'og:type', content: 'video'})
        /*
<meta property="og:url" content="https://vimeo.com/228891505">
<meta property="og:title" content="Kyrgystan &amp; Kazachstan 2017">
<meta property="og:description" content="Trekking and wandering. Terskey Alatau, Song Kul, Kul Ukok, Ala Archa, Almaty.">
<meta property="og:updated_time" content="2018-03-17T23:17:48-04:00">
<meta property="og:image" content="https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F649061989_1280x720.webp&src1=https%3A%2F%2Ff.vimeocdn.com%2Fimages_v6%2Fshare%2Fplay_icon_overlay.png">
<meta property="og:image:secure_url" content="https://i.vimeocdn.com/filter/overlay?src0=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F649061989_1280x720.webp&src1=https%3A%2F%2Ff.vimeocdn.com%2Fimages_v6%2Fshare%2Fplay_icon_overlay.png">
<meta property="og:image:type" content="image/jpg">
<meta property="og:image:width" content="1280">
<meta property="og:image:height" content="720">
        */
    }
}