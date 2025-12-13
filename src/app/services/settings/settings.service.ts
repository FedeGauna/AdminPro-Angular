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
    localStorage.setItem('settings', JSON.stringify( this.settings ));
  }

  loadSettings() {
    if ( localStorage.getItem('settings')) {
      this.settings = JSON.parse( localStorage.getItem('settings') );
      console.log('Loading settings');

      this.applyTheme( this.settings.theme );
    } else {
      console.log('Using default values');
    }
  }

  applyTheme( theme: string ) {
    const url = `assets/css/colors/${ theme }.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.settings.theme = theme;
    this.settings.themeUrl = url;

    this.saveSettings();
  }
}


