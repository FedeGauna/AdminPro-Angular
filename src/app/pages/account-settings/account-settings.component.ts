import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';

/**
 * Component for managing user account settings.
 * Provides UI for selecting and applying application themes.
 */
@Component({
    selector: 'app-account-settings',
    standalone: true,
    templateUrl: './account-settings.component.html',
    styles: []
})
export class AccountSettingsComponent implements OnInit {

// tslint:disable-next-line: variable-name
  /**
   * Initializes the AccountSettingsComponent with the settings service.
   * @param _settings Service for managing application settings.
   */
  constructor( public _settings: SettingsService ) { }

  ngOnInit() {
    this.placeCheck();
  }

  /**
   * Applies the selected theme and updates the UI.
   * @param theme The name of the theme to apply.
   * @param link The DOM element representing the theme selector.
   */
  changeColour( theme: string, link: any ) {
    this.applyCheck( link );
    this._settings.applyTheme( theme );
  }

  /**
   * Updates the UI to reflect the selected theme selector.
   * @param link The DOM element to mark as selected.
   */
  applyCheck( link: any ) {

    const selectors: any = document.getElementsByClassName('selector');

    for ( const ref of selectors) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  /**
   * Marks the currently active theme selector in the UI based on saved settings.
   */
  placeCheck( ) {

    const selectors: any = document.getElementsByClassName('selector');
    const theme = this._settings.settings.theme;

    for ( const ref of selectors) {
      if ( ref.getAttribute('data-theme') === theme ) {
        ref.classList.add('working');
        break;
      }
    }
  }

}
