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
import { NgSelectModule } from '@ng-select/ng-select';

import { SharedModule } from '../shared';

import * as components from './components';

const allComponents = [
    components.CatalogueComponent,
    components.CiphersComponent,
    components.ContactComponent,
    components.InstructionsComponent,
    components.LoginComponent,
    components.MediaComponent,
    components.NewsComponent,
    components.ParticipantsComponent,
    components.RegistrationComponent,
    components.ResultsComponent,
    components.VideoComponent
];

@NgModule({
    declarations: allComponents,
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        NgSelectModule,

        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,

        ModalModule.forRoot(),
        CollapseModule.forRoot(),
        AlertModule.forRoot()
    ],
    exports: allComponents
})
export class MainModule {
}
