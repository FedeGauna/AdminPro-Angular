import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/service.index';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styles: [],
    imports: [RouterLinkActive, RouterLink, CommonModule]
})
/**
 * Component responsible for rendering the application's sidebar.
 * Provides navigation links and interacts with the SidebarService.
 */
export class SidebarComponent implements OnInit {

  /**
   * Initializes the SidebarComponent with the provided sidebar service.
   * @param sidebar Service for managing sidebar-related functionality.
   */
  constructor( public sidebar: SidebarService) { }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit() {
  }

}
