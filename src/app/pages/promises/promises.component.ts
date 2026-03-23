import { Component, OnInit } from '@angular/core';

/**
 * Component demonstrating JavaScript promises.
 * Executes a promise that resolves after a countdown.
 */
@Component({
    selector: 'app-promises',
    standalone: true,
    templateUrl: './promises.component.html',
    styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
     this.countThree().then(
      message => console.log('Finished..', message)
     )
     .catch( error => console.error('Error in the promise. ', error));
   }

  ngOnInit() {
  }

  /**
   * Creates a promise that resolves to true after a 3-second countdown.
   * @returns A promise that resolves after counting to 3.
   */
  countThree(): Promise<boolean> {
   return new Promise((resolve, reject) => {
      let counter = 0;

      const interval = setInterval(() => {
        counter += 1;

        if ( counter === 3 ) {
          resolve( true );
          clearInterval(interval);
        }
      }, 1000 );
    });
  }

}
