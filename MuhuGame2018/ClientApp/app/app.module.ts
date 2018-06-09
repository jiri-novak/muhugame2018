import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { SharedModule } from './shared';
import { MainModule } from './main';

import { AppComponent } from './app.component';
import { RoutesConfig } from './app.routes';
import { AppSettings } from './app.settings';

export function getBaseUrl(): string {
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
        AppSettings,
        { provide: 'BASE_URL', useFactory: getBaseUrl }
    ]
})
export class AppModule {
}
