import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { passwordCustomValidator } from "./password-custom-validator";
import { PasswordSettings } from "./password-settings.model";

declare function initPlugins();

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;

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
