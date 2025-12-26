import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { passwordCustomValidator } from "./password-custom-validator";
import { PasswordSettings } from "./password-settings.model";
import { Router, RouterLink } from "@angular/router";
import { NgClass, CommonModule } from "@angular/common";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';



declare function initPlugins();

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgClass, RouterLink, CommonModule, FontAwesomeModule],
    
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;
  faFacebook = faFacebookF;
  faGoogle = faGooglePlusG;

  passwordSettings: PasswordSettings = {
    inputType: "password",
    iconClass: {
      "bi bi-eye":        false,
      "bi bi-eye-slash":  true,
    },
  };

  constructor(private formBuilder: FormBuilder, public router: Router) {}

  ngOnInit() {
    initPlugins();

    this.loginForm = this.formBuilder.group({
      user: ["", Validators.required],
      password: ["", [passwordCustomValidator()]],
    });
  }

  get user() {
    return this.loginForm.get("user");
  }

  get password() {
    return this.loginForm.get("password");
  }

  getErrors(controlName: string): string[] {
    const control = this.loginForm.get(controlName);
    return control && control.errors ? Object.values(control.errors) : [];
  }

  checkCredentials() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.router.navigate(["/pages/dashboard"]);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.passwordSettings.inputType = this.showPassword ? "text" : "password";
    this.passwordSettings.iconClass = {
      "bi bi-eye": !this.showPassword,
      "bi bi-eye-slash": this.showPassword,
    };
  }
}
