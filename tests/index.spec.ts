import { test, expect } from '@playwright/test';

test.describe("test landing page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Testing ${testInfo}`)

    await page.goto("http://localhost:4321/")
  })

  test("should have flower and oh teezy images", async ({ page }) => {
    await expect(page.getByRole('img', { name: 'flower', exact: true })).toBeVisible()

    await expect(page.getByRole("img", { name: "Oh Teezy", exact: true })).toBeVisible()
    await expect(page.getByRole("img", { name: "Oh Teezy logo", exact: true })).toBeVisible()
  })

  test("should have about-me link", async ({ page }) => {
    await expect(page.getByRole('link', { name: 'gehe zur über mich Seite' })).toBeVisible();
  })

  test("should have navbar", async ({ page }) => {
    await expect(page.getByRole("navigation").first()).toBeVisible()
    await expect(page.getByLabel('öffne/schließe Navigationsmenü')).toBeVisible();
    await expect(page.getByRole('link', { name: 'gehe zur Kontakt Seite' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'gehe zur Home Seite' })).toBeVisible();
    await expect(page.getByLabel('wechsel Sprache zu Englisch')).toBeVisible();
  })

  test("should hav navbar links", async ({ page }) => {
    await page.getByLabel('öffne/schließe Navigationsmenü').locator('span').nth(1).click();
    await expect(page.getByText('Home')).toBeVisible();
    await expect(page.getByLabel('gehe zur Work Seite')).toBeVisible();
    await expect(page.getByText('Über Mich', { exact: true })).toBeVisible();
    await expect(page.locator('#navlist').getByLabel('gehe zur Kontakt Seite')).toBeVisible();
  })

  test("should have cookie banner", async ({ page }) => {
    await page.waitForTimeout(6000); // waiting for animation to finish
    await expect(page.getByText('DatenschutzWir nutzen Cookies')).toBeVisible();

    await page.getByRole('button', { name: 'Erweitert' }).click();
    await expect(page.getByLabel('Funktionale Cookies')).toBeVisible();
    await expect(page.getByLabel('Analyse Cookies')).toBeVisible();
    await expect(page.getByLabel('Werbe Cookies')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ablehnen' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Speichere Einstellung' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Akzeptiere' })).toBeVisible();

    await page.getByLabel('Funktionale Cookies').press('Escape');
    await page.getByLabel('wechsel Sprache zu Englisch').click();
    await page.getByRole('button', { name: 'Advanced' }).click();
    await expect(page.getByLabel('Functional Cookies')).toBeVisible();
    await expect(page.getByLabel('Analytics Cookie')).toBeVisible();
    await expect(page.getByLabel('Advertising cookies')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Deny' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save Settings' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Accept' })).toBeVisible();
  })

  test("should have translate link", async ({ page }) => {
    await expect(page.getByLabel('wechsel Sprache zu Englisch')).toBeVisible();
    await page.getByLabel('wechsel Sprache zu Englisch').click();
    await expect(page.getByLabel('change language to german')).toBeVisible();
  })
})