import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { RouterOutlet } from '@angular/router';

declare function initPlugins();

/**
 * Main layout component for authenticated pages.
 * Contains the header, sidebar, breadcrumbs, and router outlet for child pages.
 */
@Component({
    selector: 'app-pages',
    standalone: true,
    templateUrl: './pages.component.html',
    styles: [],
    imports: [HeaderComponent, SidebarComponent, BreadcrumbsComponent, RouterOutlet]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    initPlugins();
  }

}
