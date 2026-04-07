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
 * Renders the application sidebar.
 */
export class SidebarComponent implements OnInit {

  /**
   * Initializes the SidebarComponent.
   * @param sidebar Service for sidebar navigation.
   */
  constructor( public sidebar: SidebarService) { }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit() {
  }

}