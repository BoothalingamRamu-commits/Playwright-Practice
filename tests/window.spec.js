import{test , expect} from '@playwright/test'
test('title' , async({page}) => {

// await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
// const [newWin] = await Promise.all();
// await page.locator('//button[@id="openwindow"]');

await page.goto('https://www.saucedemo.com/');

await page.locator('input#user-name').fill('standard_user');
await page.locator('input#password').fill('secret_sauce');
await page.locator('input#login-button').click();
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
await page.locator('button#add-to-cart-sauce-labs-backpack').click();
await page.locator('button#add-to-cart-sauce-labs-onesie').click();
await page.locator('//a[@class="shopping_cart_link"]').click();
await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
await page.waitForTimeout(5000);

await page.locator('button#checkout').click();

await page.waitForTimeout(5000);
await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
await page.locator('input#first-name').fill('BoothalingamRamu');
await page.locator('input#last-name').fill('S');
await page.locator('//input[@id="postal-code"]').fill('627006');
await page.locator('input#continue').click();
await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

await page.locator('button#finish').click();

await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
await page.waitForTimeout(5000);

await page.locator('button#generate-pdf-order').click();
await page.waitForTimeout(5000);
await page.pause(5000)
})

// import { test, expect } from '@playwright/test';

// test('Upload single file', async ({ page }) => {
//     await page.goto("https://testautomationpractice.blogspot.com/p/playwrightpractice.html");

//     // upload single file
//     await page.locator('#multipleFilesInput').setInputFiles([
//         'C:\\Users\\Ramu\\Downloads\\Sales_4967_24-25.pdf' , 
//         'C:\\Users\\Ramu\\Downloads\\Boothalingam_Ramu_QA_Automation_Engineer (1).pdf']);

//      //upload button click
//      await page.getByRole('button', {name:'Upload Multiple Files' }).click();

//     await page.waitForTimeout(7000)
// })