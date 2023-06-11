import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      title: 'Main',
      icon: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Charts', url: '/graphicsOne' },
        { titulo: 'Promises', url: '/promises' },
        { titulo: 'Rxjs', url: '/rxjs' }
      ]
    }
  ];

  constructor() { }
}
