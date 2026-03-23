import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pageNotFound',
    standalone: true,
    templateUrl: './pageNotFound.component.html',
    styles: []
})
/**
 * Component responsible for displaying a "Page Not Found" message.
 * Used when the user navigates to an undefined route.
 */
export class PageNotFoundComponent implements OnInit {

  /**
   * Initializes the PageNotFoundComponent.
   */
  constructor() { }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit() {
  }

}
