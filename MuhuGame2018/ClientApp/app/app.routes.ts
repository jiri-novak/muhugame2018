import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import * as fromComponents from './main/components/index';
import { AuthGuard } from './shared/_guards';

const routes: Routes = [
    { path: '', redirectTo: 'news', pathMatch: 'full' },
    { path: 'news', component: fromComponents.NewsComponent },
    { path: 'instructions', component: fromComponents.InstructionsComponent },
    { path: 'catalogue', component: fromComponents.CatalogueComponent },
    { path: 'media', component: fromComponents.MediaComponent },
    { path: 'media/:id', component: fromComponents.MediaComponent },
    { path: 'participants', component: fromComponents.ParticipantsComponent },
    { path: 'ciphers', component: fromComponents.CiphersComponent },
    { path: 'results', component: fromComponents.ResultsComponent },
    { path: 'login', component: fromComponents.LoginComponent },
    { path: 'logout', component: fromComponents.LoginComponent },
    { path: 'contact', component: fromComponents.ContactComponent },
    { path: 'registration', component: fromComponents.RegistrationComponent },
    { path: 'registration/:id', component: fromComponents.RegistrationComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: fromComponents.AdminComponent },
    { path: '**', redirectTo: 'news' }
];

export const RoutesConfig = RouterModule.forRoot(routes);
