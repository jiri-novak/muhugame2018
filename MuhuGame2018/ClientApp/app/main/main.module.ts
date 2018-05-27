import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';
import { VgCoreModule } from "videogular2/core";
import { VgControlsModule } from "videogular2/controls";
import { VgOverlayPlayModule } from "videogular2/overlay-play";
import { VgBufferingModule } from "videogular2/buffering";

import * as fromComponents from './components';

const declarations = [
    fromComponents.NewsComponent,
    fromComponents.InstructionsComponent,
    fromComponents.MediaComponent,
    fromComponents.VideoComponent,
    fromComponents.ParticipantsComponent,
    fromComponents.CiphersComponent,
    fromComponents.ResultsComponent,
    fromComponents.LoginComponent,
    fromComponents.ContactComponent,
    fromComponents.RegistrationComponent,
    fromComponents.HomeComponent
];

@NgModule({
    declarations,
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,

        ModalModule.forRoot(),
        CollapseModule.forRoot(),
        AlertModule.forRoot()
    ],
    exports: declarations,
    providers: [
    ]
})
export class MainModule {
}
