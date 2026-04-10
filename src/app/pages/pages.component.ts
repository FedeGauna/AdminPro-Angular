import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { RouterOutlet } from '@angular/router';

/**
 * @ignore
 */
declare function initPlugins();

/**
 * Main layout for authenticated pages.
 */
@Component({
    selector: 'app-pages',
    standalone: true,
    templateUrl: './pages.component.html',
    styles: [],
    imports: [HeaderComponent, SidebarComponent, BreadcrumbsComponent, RouterOutlet]
})
export class PagesComponent implements OnInit {

  /**
   * Initializes the PagesComponent.
   */
  constructor() { }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit() {
    initPlugins();
  }

}