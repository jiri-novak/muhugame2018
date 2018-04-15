// @angular
import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { APP_INITIALIZER, ApplicationRef, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { createNewHosts, removeNgStyles } from '@angularclass/hmr'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// third-party libraries
import { ModalModule } from 'ngx-bootstrap/modal';

// infrastructure app
import { MainModule } from './main'
import { AppComponent } from './app.component';
import { RoutesConfig } from './app.routes';
import { CollapseModule } from 'ngx-bootstrap/collapse';

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
        MainModule
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl }
    ]
})
export class AppModule {
}
