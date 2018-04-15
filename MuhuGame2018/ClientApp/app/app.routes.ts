import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { 
    NavMenuComponent, 
    NewsComponent,
    InstructionsComponent,
    MediaComponent,
    ParticipantsComponent,
    CiphersComponent,
    ResultsComponent,
    LoginComponent,
    ContactComponent
} from './main/components/index';

const routes: Routes = [
    { path: '', redirectTo: 'news', pathMatch: 'full' },
    { path: 'news', component: NewsComponent },
    { path: 'instructions', component: InstructionsComponent },
    { path: 'media', component: MediaComponent },
    { path: 'participants', component: ParticipantsComponent },
    { path: 'ciphers', component: CiphersComponent },
    { path: 'results', component: ResultsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', redirectTo: 'news' }
];

export const RoutesConfig = RouterModule.forRoot(routes);
