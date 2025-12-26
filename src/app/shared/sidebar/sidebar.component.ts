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
export class SidebarComponent implements OnInit {

  constructor( public sidebar: SidebarService) { }

  ngOnInit() {
  }

}
