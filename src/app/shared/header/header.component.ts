import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styles: [],
    imports: [RouterLinkActive, RouterLink]
})
/**
 * Component responsible for rendering the application's header.
 * Provides navigation links and other header-related functionality.
 */
export class HeaderComponent implements OnInit {

  /**
   * Initializes the HeaderComponent.
   */
  constructor() { }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit() {
  }

}
