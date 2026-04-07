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
/**
 * Root component of the application.
 */
export class AppComponent {
  title = 'AdminPro';

  /**
   * Initializes the AppComponent.
   * @param settings Service for managing application settings.
   */
  constructor(public settings: SettingsService) {}
}