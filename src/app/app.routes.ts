import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './shared/pageNotFound/pageNotFound.component';
import { RegisterComponent } from './login/register.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
    { path: '**', component: PageNotFoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
