// @angular
import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { APP_INITIALIZER, ApplicationRef, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { createNewHosts, removeNgStyles } from '@angularclass/hmr'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// third-party libraries
import { ToasterModule } from 'angular2-toaster'
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TableModule } from 'ngx-easy-table';
import { NgxFitTextModule } from 'ngx-fit-text';

// infrastructure app
import { MainModule } from './main'
import { AppComponent } from './app.component';
import { RoutesConfig } from './app.routes';
import { CollapseModule } from 'ngx-bootstrap/collapse';

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
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
        TableModule,
        ToasterModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        NgxFitTextModule.forRoot(),
        MainModule
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl }
    ]
})
export class AppModule {
}
