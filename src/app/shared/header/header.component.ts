import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';

/**
 * Renders the application header.
 */
@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styles: [],
    imports: [RouterLinkActive, RouterLink]
})
export class HeaderComponent implements OnInit {

  /**
   * Initializes the HeaderComponent.
   */
  constructor() { }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit() {
  }

}