// import{test,expect} from '@playwright/test'
// test('title', async({page}) =>{
//     await page.goto('https://practicetestautomation.com/practice-test-login/');
//     await page.locator('//input[@name="username"]').fill('student');
//     await page.locator('//input[@name="password"]').fill('Password123');
//     await page.locator('//button[@id="submit"]').click();
//     await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
//     await page.getByRole('link', {name: 'Log out'}).click();
//     await page.waitForTimeout(5000);
// })


import{test,expect} from '@playwright/test'
import { locks } from 'worker_threads';
test('title', async({page}) =>{
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.locator('//input[@name="username"]').fill('aaa');
    await page.locator('//input[@name="password"]').fill('aaa');
    await page.locator('//button[@id="submit"]').click();
    await page.getByText('Your username is invalid!').click();

})

