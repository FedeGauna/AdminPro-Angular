import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './shared/pageNotFound/pageNotFound.component';
import { RegisterComponent } from './login/register.component';
import { pagesRoutes } from './pages/pages.routes'; 

export const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'pages', children: pagesRoutes },
    { path: '**', component: PageNotFoundComponent }
];
