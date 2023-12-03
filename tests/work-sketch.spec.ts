import { expect, test } from "@playwright/test"

test.describe("Test sketch work page", () => {
    test.beforeEach(async ({ page }, testInfo) => {
        console.log(`Testing ${testInfo}`)

        await page.goto("http://localhost:4321/work/sketch")
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


    test("should have return link", async ({ page }) => {
        await expect(page.getByLabel('Gehe zurück')).toBeVisible();
    })

    test("should have corporate images", async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Sketch Design' })).toBeVisible();
        await expect(page.locator('.w-\\[25rem\\]').first()).toBeVisible();
        await expect(page.locator('.max-w-\\[1300px\\] > img:nth-child(2)')).toBeVisible();
        await expect(page.locator('img:nth-child(3)')).toBeVisible();
        await expect(page.locator('img:nth-child(4)')).toBeVisible();
        await expect(page.locator('img:nth-child(5)')).toBeVisible();
        await expect(page.locator('img:nth-child(6)')).toBeVisible();
        await expect(page.locator('img:nth-child(7)')).toBeVisible();
    })

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