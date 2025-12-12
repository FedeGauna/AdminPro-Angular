import { Component, OnInit } from '@angular/core';

declare function initPlugins();

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styles: [],
    standalone: false
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    initPlugins();
  }

}
