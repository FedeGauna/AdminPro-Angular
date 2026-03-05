import { Injectable, Inject, DOCUMENT } from '@angular/core';


interface Settings {
  themeUrl: string;
  theme: string;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  settings: Settings = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.loadSettings();
  }

  saveSettings() {
    console.log('Saved in localStorage');
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

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


