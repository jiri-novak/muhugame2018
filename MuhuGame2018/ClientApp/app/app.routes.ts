import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { 
    NavMenuComponent, 
    NewsComponent,
    RulesComponent,
    MediaComponent,
    TeamsComponent,
    CiphersComponent,
    ResultsComponent,
    LoginComponent
} from './main/components/index';

const routes: Routes = [
    { path: '', redirectTo: 'news', pathMatch: 'full' },
    { path: 'news', component: NewsComponent },
    { path: 'rules', component: RulesComponent },
    { path: 'media', component: MediaComponent },
    { path: 'teams', component: TeamsComponent },
    { path: 'ciphers', component: CiphersComponent },
    { path: 'results', component: ResultsComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'news' }
];

export const RoutesConfig = RouterModule.forRoot(routes);
