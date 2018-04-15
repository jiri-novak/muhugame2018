import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { VgCoreModule } from "videogular2/core";
import { VgControlsModule } from "videogular2/controls";
import { VgOverlayPlayModule } from "videogular2/overlay-play";
import { VgBufferingModule } from "videogular2/buffering";

import * as fromComponents from './components';
import * as fromServices from './services';

const declarations = [
    fromComponents.NavMenuComponent,
    fromComponents.NewsComponent,
    fromComponents.InstructionsComponent,
    fromComponents.MediaComponent,
    fromComponents.ParticipantsComponent,
    fromComponents.CiphersComponent,
    fromComponents.ResultsComponent,
    fromComponents.LoginComponent,
    fromComponents.ContactComponent
];

const providers = [
    fromServices.DialogService
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
    ],
    exports: declarations,
    providers: providers
})
export class MainModule {
}
