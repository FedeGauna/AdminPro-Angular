import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

/**
 * Handles user registration.
 */
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./login.component.css'],
    imports: [FormsModule, RouterLink],
    standalone: true
})
export class RegisterComponent implements OnInit {

  /**
   * Initializes the RegisterComponent.
   */
  constructor() { }

  /**
   * Lifecycle hook called after component initialization.
   */
  ngOnInit() {
  }

}