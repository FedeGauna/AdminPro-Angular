import { expect, test } from '@playwright/test';
import { LoginPage } from 'e2e/pages/login.page';

/**
 * Visual‑regression spec – captures animations & usability.
 * Run it before and after you remove the static assets.
 *
 * Usage:
 *   npm run e2e -- visual-regression.spec.ts
 * (make sure E2E_USER/E2E_PASSWORD are set, see .env.example)
 */

test.describe('Visual Regression – Animations & Usability', () => {

  test('login page renders & input focus', async ({ page }) => {
    await page.goto('/');
    const preloader = page.locator('.preloader');
    await expect(preloader).toBeVisible();
    await page.waitForTimeout(500);           // fade‑out
    await page.screenshot({ path: 'test-results/01-login-initial.png', fullPage: true });

    const userInput = page.locator('input[formControlName="user"]');
    await userInput.focus();
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'test-results/02-login-focus.png', fullPage: true });
  });

  test('login → dashboard flow with animations', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = process.env.E2E_USER || 'demo-user';
    const password = process.env.E2E_PASSWORD || 'demo-password';

    await page.goto('/');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/03-pre-login.png', fullPage: true });

    await loginPage.login(user, password);
    await page.waitForURL(/\/pages\/dashboard/, { timeout: 5000 });
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'test-results/04-dashboard-loaded.png', fullPage: true });

    await expect(page.locator('.sidebar-nav')).toBeVisible();
    await expect(page.locator('.topbar')).toBeVisible();
  });

  test('sidebar hover & expansion', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = process.env.E2E_USER || 'demo-user';
    const password = process.env.E2E_PASSWORD || 'demo-password';

    await page.goto('/');
    await page.waitForTimeout(500);
    await loginPage.login(user, password);
    await page.waitForURL(/\/pages\/dashboard/, { timeout: 5000 });
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'test-results/05-dashboard-layout.png', fullPage: true });

    const menuItem = page.locator('a.has-arrow').first();
    await menuItem.hover();
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'test-results/06-menu-hover.png', fullPage: true });

    await menuItem.click();
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'test-results/07-menu-expanded.png', fullPage: true });
  });

  test('link hover & responsive breakpoints', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = process.env.E2E_USER || 'demo-user';
    const password = process.env.E2E_PASSWORD || 'demo-password';

    await page.goto('/');
    await page.waitForTimeout(500);
    await loginPage.login(user, password);
    await page.waitForURL(/\/pages\/dashboard/, { timeout: 5000 });
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'test-results/08-links-default.png', fullPage: true });

    await page.locator('a.has-arrow').first().click();

    const firstVisibleSubmenu = page.locator('ul.collapse a[routerLink]:visible').first();

    await firstVisibleSubmenu.hover();
    await page.waitForTimeout(150);
    await page.screenshot({ path: 'test-results/09-link-hover.png', fullPage: true });

    // desktop/tablet/mobile screenshots
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'test-results/10-desktop-layout.png', fullPage: true });

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'test-results/11-tablet-layout.png', fullPage: true });

    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'test-results/12-mobile-layout.png', fullPage: true });
  });

  test('account‑settings form focus animation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = process.env.E2E_USER || 'demo-user';
    const password = process.env.E2E_PASSWORD || 'demo-password';

    await page.goto('/');
    await page.waitForTimeout(500);
    await loginPage.login(user, password);
    await page.waitForURL(/\/pages\/dashboard/, { timeout: 5000 });
    await page.waitForTimeout(500);

    await page.evaluate(() => {
      const link = document.querySelector('a[routerlink="/pages/account-settings"]') as HTMLElement | null;
      if (link) {
        link.click();
      }
    });

    await page.waitForURL(/\/pages\/account-settings/, { timeout: 5000 });
    await page.waitForTimeout(300);

    await page.screenshot({ path: 'test-results/13-settings-page.png', fullPage: true });

    const formInput = page.locator('input').first();
    if (await formInput.isVisible()) {
      await formInput.focus();
      await page.waitForTimeout(200);
      await page.screenshot({ path: 'test-results/14-input-focused.png', fullPage: true });
    }
  });

  test('theme colours – log computed values', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = process.env.E2E_USER || 'demo-user';
    const password = process.env.E2E_PASSWORD || 'demo-password';

    await page.goto('/');
    await page.waitForTimeout(500);
    await loginPage.login(user, password);
    await page.waitForURL(/\/pages\/dashboard/, { timeout: 5000 });
    await page.waitForTimeout(500);

    await page.screenshot({ path: 'test-results/15-colors-theme.png', fullPage: true });

    const topbar = page.locator('.topbar');
    if (await topbar.isVisible()) {
      const bg = await topbar.evaluate(el => window.getComputedStyle(el).backgroundColor);
      console.log(`Topbar bg: ${bg}`);
    }
  });

});