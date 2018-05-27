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
    ContactComponent,
    VideoComponent,
    RegistrationComponent,
    HomeComponent
} from './main/components/index';
import { AuthGuard } from './main/_guards';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    //{ path: '', redirectTo: 'news', pathMatch: 'full' },
    { path: 'news', component: NewsComponent },
    { path: 'instructions', component: InstructionsComponent },
    { path: 'media', component: MediaComponent },
    { path: 'media/:id', component: VideoComponent },
    { path: 'participants', component: ParticipantsComponent },
    { path: 'ciphers', component: CiphersComponent },
    { path: 'results', component: ResultsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'registration', component: RegistrationComponent },
    
    //{ path: '**', redirectTo: 'news' }
    { path: '**', redirectTo: '' }
];

export const RoutesConfig = RouterModule.forRoot(routes);
