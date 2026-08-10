import{test , expect} from '@playwright/test'
test ('title' , async({page}) => {
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
await page.getByText('Register here').click();
await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/auth/register');
await page.locator('input#firstName').fill('Boothalingam');
console.log(await page.locator('input#firstName').inputValue());
await page.locator('input#lastName').fill('Ramu');
await page.locator('input#userEmail').fill('boothalingamramu624@gmail.com');
await page.locator('input#userMobile').fill('8760457059');
await page.locator('select[formcontrolname="occupation"]').selectOption({ label: 'Engineer' });
await page.locator('input[value="Male"]').check();
await page.locator('input#userPassword').fill('Heychamp6!');
await page.locator('input#confirmPassword').fill('Heychamp6!');
await page.locator('input[type="checkbox"]').check();
await page.getByRole('button', { name: 'Register' }).click();
await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/auth/register');
await page.getByRole('button' , {name : 'Login'}).click();
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
await page.locator('input#userEmail').fill('boothalingamramu624@gmail.com');
await page.locator('input#userPassword').fill('Heychamp6!');
await page.getByRole('button' , {name : 'Login'}).click();
await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
page.selectOption()

})