import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { TableModule } from 'ngx-easy-table';
import { BusyModule } from 'angular2-busy';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxFitTextModule } from 'ngx-fit-text';

import * as fromComponents from './components';
import * as fromServices from './services';

const declarations = [
    fromComponents.NavMenuComponent,
    fromComponents.NewsComponent,
    fromComponents.RulesComponent,
    fromComponents.MediaComponent,
    fromComponents.TeamsComponent,
    fromComponents.CiphersComponent,
    fromComponents.ResultsComponent,
    fromComponents.LoginComponent
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

        TableModule,
        BusyModule,
        ModalModule.forRoot(),
        CollapseModule.forRoot(),
        NgxFitTextModule.forRoot()
    ],
    exports: declarations,
    providers: providers
})
export class MainModule {
}
