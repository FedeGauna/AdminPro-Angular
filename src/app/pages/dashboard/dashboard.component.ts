import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styles: []
})
/**
 * Displays the main application dashboard.
 */
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