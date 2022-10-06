import { test, expect, type Page } from '@playwright/test';

test('I should be able to add a single todo item', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');

  await page.locator('.new-todo').fill('feed the cat');

  await page.locator('.new-todo').press('Enter');

  await expect(page.locator('.view label')).toHaveText(['feed the cat']);
});

