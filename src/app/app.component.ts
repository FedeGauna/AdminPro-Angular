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
 * Provides the main entry point and initializes application-wide settings.
 */
export class AppComponent {
  title = 'AdminPro';

  /**
   * Initializes the AppComponent with the provided settings service.
   * @param settings Service for managing application settings.
   */
  constructor(public settings: SettingsService) {}
}
