import { Page } from "@playwright/test";

export class LoginPage {
  constructor(private page: Page) {}

  userInput = this.page.locator('input[formControlName="user"]');
  passwordInput = this.page.locator('input[formControlName="password"]');

  loginButton = this.page.getByRole('button', { name: 'Login' });

  async login(user:string, pass:string) {
    await this.userInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}