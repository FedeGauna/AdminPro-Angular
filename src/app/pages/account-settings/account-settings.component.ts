import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styles: [],
    standalone: false
})
export class AccountSettingsComponent implements OnInit {

// tslint:disable-next-line: variable-name
  constructor( public _settings: SettingsService ) { }

  ngOnInit() {
    this.placeCheck();
  }

  changeColour( theme: string, link: any ) {
    this.applyCheck( link );
    this._settings.applyTheme( theme );
  }

  applyCheck( link: any ) {

    const selectors: any = document.getElementsByClassName('selector');

    for ( const ref of selectors) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

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
