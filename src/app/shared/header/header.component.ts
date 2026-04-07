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
 * Renders the application header.
 */
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