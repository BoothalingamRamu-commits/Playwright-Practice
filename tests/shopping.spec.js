import{test , expect} from '@playwright/test'
test('title' , async({page})=>{
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
await page.locator('input#userEmail').fill('boothalingamramu624@gmail.com');
await page.locator('input#userPassword').fill('Heychamp1998!');
await page.locator('input#login').click();
expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');
await page.locator('div.card' , {hasText: 'iphone 13 pro'}).getByRole('button' , {name:  'Add To Cart'}).click();
await page.locator('button[routerlink="/dashboard/cart"]').click();
await page.getByRole('button', { name: 'Checkout' }).click();
await page.locator("input[value='4542 9931 9292 2293']").fill('4542 9931 9292 2293');
const expiry = page.locator('div.field.small', {hasText: 'Expiry Date' });
await expiry.locator('select').nth(0).selectOption('02');
await expiry.locator('select').nth(1).selectOption('14');
await page.locator('div.field.small', { hasText: 'CVV Code' }).locator('input').fill('222');
await page.locator('div.field', { hasText: 'Name on Card' }).locator('input').fill('Boothalingam Ramu');
await page.getByPlaceholder('Select Country').fill('India');
await page.waitForTimeout(500);
await page.getByText('India', { exact: true }).click();
await page.getByText('India', { exact: true }).click();
await page.getByRole('link', { name: 'Place Order' }).click();
await expect(page).toHaveURL(/thanks/);
await expect(page.getByRole('heading', { name: 'Thankyou for the order.' })).toBeVisible();

await page.pause();
})