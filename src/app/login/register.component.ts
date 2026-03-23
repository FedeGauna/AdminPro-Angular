import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./login.component.css'],
    imports: [FormsModule, RouterLink],
    standalone: true
})
/**
 * Component responsible for user registration.
 * Provides the registration form and handles user input.
 */
export class RegisterComponent implements OnInit {

  /**
   * Initializes the RegisterComponent.
   */
  constructor() { }

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit() {
  }

}
