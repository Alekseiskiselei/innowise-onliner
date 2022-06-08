const { test, expect } = require('@playwright/test');
const { baseURL, device, deviceURL } = require('../helpers/data');

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL);
  await page.locator('.fast-search__input').fill(device);
  await page
    .frameLocator('.modal-iframe')
    .locator('.product__title-link')
    .click();
});

test('Should search specific product', async ({ page }) => {
  await expect(page).toHaveURL(deviceURL);
});

test('Should add product to cart', async ({ page }) => {
  const title = page.locator('.catalog-masthead__title');
  const description = page.locator('#specs');
  await expect(title).toHaveText(device);
  await expect(description).toBeVisible(true);
});
