import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettingsService } from 'src/app/services/settings/settings.service';

/**
 * Root component of the application.
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AppComponent {
  /** Application title displayed in the browser tab. */
  title = 'AdminPro';

  /**
   * Initializes the AppComponent.
   * @param settings Service for managing application settings.
   */
  constructor(public settings: SettingsService) {}
}