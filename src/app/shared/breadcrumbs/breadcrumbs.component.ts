import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
    selector: 'app-breadcrumbs',
    standalone: true,
    templateUrl: './breadcrumbs.component.html',
    styles: []
})
/**
 * Displays breadcrumbs and updates page metadata.
 */
export class BreadcrumbsComponent implements OnInit {

  _title: string;

  /**
   * Initializes the BreadcrumbsComponent.
   * @param router Service for navigation.
   * @param title Service for setting the document title.
   * @param meta Service for updating meta tags.
   */
  constructor( private router: Router,
               private title: Title,
               private meta: Meta ) {

      this.getDataRoute()
      .subscribe( data => {
        this._title = data.title;
        this.title.setTitle(this._title);

        const metaTag: MetaDefinition = {
          name: 'description',
          content: this._title
        };

        this.meta.updateTag( metaTag );
      });
   }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit() {
  }

  /**
   * Extracts route data from router events.
   * @returns An observable emitting the current route's data.
   */
  getDataRoute() {
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd ) => event.snapshot.data )
    );
  }

}