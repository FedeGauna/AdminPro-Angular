import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent {
  title = 'AdminPro';

  constructor(public settings: SettingsService ) {

  }
}
