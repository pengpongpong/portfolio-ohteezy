import { test, expect } from '@playwright/test';


test.describe("test about-me page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Testing ${testInfo}`)

    await page.goto("http://localhost:4321/ueber-mich")
  })


  test("should have about-me image and signature image", async ({ page }) => {
    await expect(page.locator('img').nth(3)).toBeVisible();
    await expect(page.locator('picture img')).toBeVisible();
  });


  test("should have footer", async ({ page }) => {
    await page.getByRole('button', { name: 'Akzeptieren' }).click(); // cookiebanner

    await expect(page.getByRole('link', { name: 'Kontakt', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Datenschutz' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Impressum' })).toBeVisible();
    await expect(page.getByLabel('verfasse Email')).toBeVisible();
    await expect(page.getByLabel('besuche Instagram Profil')).toBeVisible();
    await expect(page.getByLabel('besuche LinkedIn Profil')).toBeVisible();
    await expect(page.getByText('Copyright © 2023 - Oh Teezy')).toBeVisible();
  })

})

