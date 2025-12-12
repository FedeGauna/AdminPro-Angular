import { Component } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'adminpro';

  constructor( public ajustes: SettingsService ) {

  }
}
