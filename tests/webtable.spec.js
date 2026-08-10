// import {test , expect} from '@playwright/test'
// test('web table',async ({page}) =>{
// await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
// await page.waitForTimeout(4000)
// const countExp = 'Automation';
// const count = page.locator('.left-align table[@id="product"]tr');
// const count = await tableRows.count();

// for(let i=1;i<count;i++){
//     const courseName = await tableRows.nth(i).locator('td').nth(4).textContent();
//     if(courseName.includes(countExp)){
//         console.log(courseName);

//         const coursePrice = await tableRows.nth(i).locator('td').nth(2).textContent();
//         console.log(coursePrice);
//         break;
//     }
// }
// })

import { test, expect } from "@playwright/test";

test("Validate basic functionalities", async ({ page, context }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const courseExp = "Bugzilla";

    const tableRows = page.locator('.left-align table[id="product"] tr');

    const count = await tableRows.count();

    for (let i = 1; i < count; i++) {

        const courseName = await tableRows.nth(i).locator("td").nth(7).textContent();

        if (courseName.includes(courseExp)) {

            console.log(courseName);

            const coursePrice = await tableRows.nth(i).locator("td").nth(7).textContent();

            console.log(coursePrice);

            break;
        }
    }

});