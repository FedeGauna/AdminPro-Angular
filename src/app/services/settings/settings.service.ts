import { Injectable, Inject, DOCUMENT } from '@angular/core';


interface Settings {
  themeUrl: string;
  theme: string;
}

/**
 * Service responsible for managing application settings.
 * Handles theme selection and persistence of settings.
 */
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  /**
   * Current settings including theme and theme URL.
   */
  settings: Settings = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };

  /**
   * Initializes the SettingsService and loads saved settings.
   * @param _document Reference to the document object for DOM manipulation.
   */
  constructor(@Inject(DOCUMENT) private _document) {
    this.loadSettings();
  }

  /**
   * Saves the current settings to localStorage.
   */
  saveSettings() {
    console.log('Saved in localStorage');
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  /**
   * Loads settings from localStorage or uses default values if none are found.
   */
  loadSettings() {
    const stored = localStorage.getItem('settings');

    if (stored) {
      try {
        this.settings = JSON.parse(stored);
        console.log('Loading settings');
        this.applyTheme(this.settings.theme);
      } catch {
        console.log('Invalid settings JSON, using defaults');
      }
    } else {
      console.log('Using default values');
    }
  }

  /**
   * Applies the specified theme by updating the theme link in the document.
   * @param theme The name of the theme to apply.
   */
  applyTheme(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    const themeLink = this._document.getElementById('theme') as HTMLLinkElement | null;

    if (themeLink) {
      themeLink.href = url;
    }

    this.settings.theme = theme;
    this.settings.themeUrl = url;

    this.saveSettings();
  }
}


