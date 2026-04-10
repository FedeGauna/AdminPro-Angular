import { Component, OnInit } from '@angular/core';

/**
 * Displays the main application dashboard.
 */
@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent implements OnInit {

  /**
   * Initializes the DashboardComponent.
   */
  constructor() { }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit() {
  }

}