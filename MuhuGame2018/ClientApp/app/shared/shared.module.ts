import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';

import * as fromComponents from './components';
import * as fromServices from './_services';
import * as fromGuards from './_guards/index';
import * as fromPipes from './_pipes/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const allComponents = [
    fromPipes.QuestionableBooleanPipe,
    fromPipes.ArrayLengthPipe,
    fromPipes.MemberNamesPipe,
    fromComponents.AlertsComponent,
    fromComponents.AppLayoutHeaderComponent,
    fromComponents.AppLayoutFooterComponent,
    fromComponents.BusyIndicatorComponent
];

@NgModule({
    declarations: allComponents,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,

        ModalModule.forRoot(),
        CollapseModule.forRoot(),
        AlertModule.forRoot()
    ],
    exports: allComponents,
    providers: [
        fromServices.AlertService,
        fromServices.UserService,
        fromServices.AuthenticationService,
        fromServices.DialogService,
        fromServices.MessageService,
        fromGuards.AuthGuard
    ]
})
export class SharedModule {
}
