import { expect, test } from '@playwright/test';
import { LoginPage } from 'e2e/pages/login.page';

test('login with valid credentials navigates to dashboard', 
  async ({ page }) => {
    const loginPage = new LoginPage(page);

    const user = process.env.E2E_USER;
    const password = process.env.E2E_PASSWORD;

    if (!user || !password) {
      throw new Error('E2E_USER and E2E_PASSWORD not defined in environment variable.');
    }

    await page.goto('/');

    await loginPage.login(user, password);

    await expect(page).toHaveURL(/\/pages\/dashboard/);
});
