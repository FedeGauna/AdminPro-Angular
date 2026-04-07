import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pageNotFound',
    standalone: true,
    templateUrl: './pageNotFound.component.html',
    styles: []
})
/**
 * Displays a 404 error for undefined routes.
 */
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