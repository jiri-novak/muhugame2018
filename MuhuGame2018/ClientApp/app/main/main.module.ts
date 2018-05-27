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
import * as fromServices from './_services';
import * as fromDirectives from './_directives/index';
import * as fromGuards from './_guards/index';

const declarations = [
    fromDirectives.AlertComponent,
    fromComponents.NavMenuComponent,
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
    ],
    exports: declarations,
    providers: [
        fromGuards.AuthGuard,
        fromServices.DialogService,
        fromServices.AlertService,
        fromServices.UserService,
        fromServices.AuthenticationService
    ]
})
export class MainModule {
}
