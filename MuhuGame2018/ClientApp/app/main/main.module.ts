import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';

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
        
        ModalModule.forRoot(),
        CollapseModule.forRoot(),
    ],
    exports: declarations,
    providers: providers
})
export class MainModule {
}
