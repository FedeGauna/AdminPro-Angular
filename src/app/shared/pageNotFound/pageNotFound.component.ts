import { Component, OnInit } from '@angular/core';

/**
 * Displays a 404 error for undefined routes.
 */
@Component({
    selector: 'app-pageNotFound',
    standalone: true,
    templateUrl: './pageNotFound.component.html',
    styles: []
})
export class PageNotFoundComponent implements OnInit {

  /**
   * Initializes the PageNotFoundComponent.
   */
  constructor() { }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit() {
  }

}