import{test , expect} from '@playwright/test'
test('Page Inspect' , async({page})=>{

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await page.locator('//input[@value="radio2"]').check();
    await expect(await page.locator('//input[@value="radio2"]')).toBeChecked();
    await page.locator('//input[@id="autocomplete"]').fill
    

})