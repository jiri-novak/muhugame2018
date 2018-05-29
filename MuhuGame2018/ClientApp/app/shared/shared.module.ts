import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';

import * as fromComponents from './components';
import * as fromServices from './_services';
import * as fromGuards from './_guards/index';

const declarations = [
    fromComponents.AlertsComponent,
    fromComponents.AppLayoutHeaderComponent,
    fromComponents.AppLayoutFooterComponent,
];

@NgModule({
    declarations,
    imports: [
        CommonModule,
        RouterModule,

        ModalModule.forRoot(),
        CollapseModule.forRoot(),
        AlertModule.forRoot()
    ],
    exports: declarations,
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
