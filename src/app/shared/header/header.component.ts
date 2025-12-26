import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styles: [],
    imports: [RouterLinkActive, RouterLink]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
