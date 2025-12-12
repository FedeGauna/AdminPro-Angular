import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styles: [],
    standalone: false
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;


  constructor() {

    this.subscription = this.returnObservable()
    .subscribe(
      number => console.log( 'Subs ', number),
      error  => console.error('Error in the observable', error ),
      ()     => console.log('Observer finished!')
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {

   return new Observable( (observer: Subscriber<any>) => {

      let counter = 0;
      const intervalo = setInterval( () => {
        counter ++;

        const output = {
          value: counter
        };

        observer.next( output );

      }, 1000);
    }).pipe(
      map( resp => resp.value),
      filter(( value, index ) => {
        if ( (value % 2) === 1) {
          // even
          return true;
        } else {
          // odd
          return false;
        }
      })
    );
  }
}
