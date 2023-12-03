import { test, expect } from '@playwright/test';

test.describe("test contact page", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Testing ${testInfo}`)

    await page.goto("http://localhost:4321/kontakt")
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


  test("should have contact links", async ({ page }) => {
    await expect(page.getByLabel('verfasse email', { exact: true })).toBeVisible();
    await expect(page.getByText('Instagram')).toBeVisible();
    await expect(page.getByText('LinkedIn')).toBeVisible();
  });

  test("should have contact form", async ({ page }) => {
    await page.getByPlaceholder('Dein Name').click();
    await page.getByPlaceholder('Dein Name').fill('test');
    await page.getByPlaceholder('Dein Name').press('Tab');
    await page.getByRole('combobox').selectOption('email');
    await page.getByPlaceholder('deine@email.com').click();
    await page.getByPlaceholder('deine@email.com').fill('test@test.com');
    await page.getByPlaceholder('Hinterlasse mir eine Nachricht').click();
    await page.getByPlaceholder('Hinterlasse mir eine Nachricht').fill('test');
    await page.getByRole('button', { name: 'Abschicken' }).click();
    await expect(page.getByText('Kontaktanfrage gesendet!')).toBeVisible();
  })

  test("should have error messages on contact form DE", async ({ page }) => {
    await page.getByRole('button', { name: 'Abschicken' }).click();
    await expect(page.getByText('Bitte Name eintragen')).toBeVisible();
    await expect(page.getByText('Bitte Kontaktform auswählen')).toBeVisible();

    await page.getByRole('combobox').selectOption('email');
    await page.getByRole('button', { name: 'Abschicken' }).click();
    await expect(page.getByText('Ungültige Email')).toBeVisible();

    await page.getByRole('combobox').selectOption('call');
    await page.getByRole('button', { name: 'Abschicken' }).click();
    await expect(page.getByText('Ungültige Telefonnummer')).toBeVisible();

    await page.getByPlaceholder('Dein Name').click();
    await page.getByPlaceholder('Dein Name').fill('test');
    await page.getByRole('combobox').selectOption('email');
    await page.getByPlaceholder('deine@email.com').click();
    await page.getByPlaceholder('deine@email.com').fill('test@wrong');
    await page.getByRole('button', { name: 'Abschicken' }).click();
    await expect(page.getByText('Fehler - Ungültige Email!')).toBeVisible();
  });

  test("should have error message on contact form EN", async ({ page }) => {
    await page.getByLabel('wechsel Sprache zu Englisch').click();
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByText('Please enter your name')).toBeVisible();
    await expect(page.getByText('Please choose contact method')).toBeVisible();

    await page.getByRole('combobox').selectOption('email');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByText('Invalid email')).toBeVisible();

    await page.getByRole('combobox').selectOption('call');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByText('Invalid phone number')).toBeVisible();

    await page.getByPlaceholder('Your name').click();
    await page.getByPlaceholder('Your name').fill('test');
    await page.getByRole('combobox').selectOption('email');
    await page.getByPlaceholder('your@email.com').click();
    await page.getByPlaceholder('your@email.com').fill('test@wrong');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByText('Error - Invalid email!')).toBeVisible();
  });

  test("should have footer", async ({ page }) => {
    await page.getByRole('button', { name: 'Akzeptieren' }).click(); // cookiebanner

    await expect(page.getByRole('link', { name: 'Kontakt', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Datenschutz' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Impressum' })).toBeVisible();
    await expect(page.getByLabel('verfasse Email')).toHaveCount(2);
    await expect(page.getByLabel('besuche Instagram Profil')).toHaveCount(2);
    await expect(page.getByLabel('besuche LinkedIn Profil')).toHaveCount(2);
    await expect(page.getByText('Copyright © 2023 - Oh Teezy')).toBeVisible();
  })
})

