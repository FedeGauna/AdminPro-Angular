import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

/**
 * Component that displays breadcrumbs based on the current route.
 * Updates the page title and meta description tag dynamically.
 */
@Component({
    selector: 'app-breadcrumbs',
    standalone: true,
    templateUrl: './breadcrumbs.component.html',
    styles: []
})
export class BreadcrumbsComponent implements OnInit {

  _title: string;

  /**
   * Initializes the BreadcrumbsComponent with router, title, and meta services.
   * Subscribes to route changes to update page metadata.
   * @param router Service for navigation and route information.
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

  ngOnInit() {
  }

  /**
   * Extracts route data from router events.
   * @returns An observable emitting the current route's data object.
   */
  getDataRoute() {
    return this.router.events.pipe(
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd ) => event.snapshot.data )
    );
  }

}
