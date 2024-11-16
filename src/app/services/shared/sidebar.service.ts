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
        { title: 'Dashboard', url: '/pages/dashboard' },
        { title: 'ProgressBar', url: '/pages/progress' },
        { title: 'Charts', url: '/pages/graphicsOne' },
        { title: 'Promises', url: '/pages/promises' },
        { title: 'Rxjs', url: '/pages/rxjs' }
      ]
    }
  ];

  constructor() { }
}
