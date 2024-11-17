import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { passwordCustomValidator } from "./password-custom-validator";

declare function initPlugins();

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public router: Router) {
    this.loginForm = this.formBuilder.group({
      user: ["", Validators.required],
      password: ["", [passwordCustomValidator()]],
    });
  }

  get user() {
    return this.loginForm.get('user');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getErrors(controlName: string): string[] {
    const control = this.loginForm.get(controlName);
    return control && control.errors ? Object.values(control.errors) : [];
  }

  ngOnInit() {
    initPlugins();
  }

  checkCredentials() {
    if(this.loginForm.valid)
    {
      this.router.navigate(["/pages/dashboard"]);
    }
  }
}
