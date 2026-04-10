import { Component, OnInit } from '@angular/core';

/**
 * Demonstrates JavaScript promises.
 */
@Component({
    selector: 'app-promises',
    standalone: true,
    templateUrl: './promises.component.html',
    styles: []
})
export class PromisesComponent implements OnInit {

  /**
   * Initializes the PromisesComponent and executes the countdown promise.
   */
  constructor() {
     this.countThree().then(
      message => console.log('Finished..', message)
     )
     .catch( error => console.error('Error in the promise. ', error));
   }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit() {
  }

  /**
   * Creates a promise that resolves after a 3-second countdown.
   * @returns A promise that resolves to true after 3 seconds.
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