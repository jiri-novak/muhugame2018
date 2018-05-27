import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { APP_INITIALIZER, ApplicationRef, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { createNewHosts, removeNgStyles } from '@angularclass/hmr'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { SharedModule } from './shared';
import { MainModule } from './main';
import { AppComponent } from './app.component';
import { RoutesConfig } from './app.routes';
import { AppConfig } from './app.config';

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RoutesConfig,
        BrowserModule,
        BrowserAnimationsModule,
        ModalModule.forRoot(),
        CollapseModule.forRoot(),

        SharedModule,
        MainModule
    ],
    providers: [
        AppConfig,
        { provide: 'BASE_URL', useFactory: getBaseUrl }
    ]
})
export class AppModule {
}
