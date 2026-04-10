import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

/**
 * Demonstrates RxJS observables and operators.
 */
@Component({
    selector: 'app-rxjs',
    standalone: true,
    templateUrl: './rxjs.component.html',
    styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  /** Subscription to the observable for cleanup on destroy. */
  subscription: Subscription;

  /**
   * Initializes the RxjsComponent and subscribes to the observable.
   */
  constructor() {

    this.subscription = this.returnObservable()
    .subscribe(
      number => console.log( 'Subs ', number),
      error  => console.error('Error in the observable', error ),
      ()     => console.log('Observer finished!')
    );

  }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit() {
  }

  /**
   * Lifecycle hook called before component destruction.
   * Unsubscribes from the observable.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Creates an observable that emits incrementing numbers and filters for odd values.
   * @returns An observable emitting odd numbers at 1-second intervals.
   */
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
          return true;
        } else {
          return false;
        }
      })
    );
  }
}