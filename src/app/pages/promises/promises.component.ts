import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
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

  countThree(): Promise<boolean> {
   return new Promise((resolve, reject) => {
      let counter = 0;

      const interval = setInterval(() => {
        counter += 1;
        console.log( counter );

        if ( counter === 3 ) {
          resolve( true );
          clearInterval(interval);
        }
      }, 1000 );
    });
  }

}
