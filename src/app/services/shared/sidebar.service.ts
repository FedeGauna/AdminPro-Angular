import { Injectable } from '@angular/core';

/**
 * Service for managing sidebar navigation menu structure.
 */
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  /**
   * Menu structure for the sidebar navigation.
   */
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
}
