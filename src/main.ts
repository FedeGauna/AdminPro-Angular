import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { provideRouter, withHashLocation } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { bootstrapApplication } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes, withHashLocation())
  ]
})
  .catch(err => console.error(err));
