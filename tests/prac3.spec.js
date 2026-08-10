import {test , expect} from '@playwright/test'
import { count } from 'node:console';
test('title' , async({page}) => {
await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
//await page.locator("input[value='radio2']").click();
const dropdown= page.locator('select#dropdown-class-example');
await dropdown.selectOption({index:3});
expect(page.locator('select#dropdown-class-example>option')).toHaveCount(4);
let dropdowvalues=[];
let dropdownsortedvalues=[];
dropdowvalues=await page.locator('select#dropdown-class-example>option').allTextContents();
dropdownsortedvalues=dropdowvalues.sort();
expect(dropdowvalues).toEqual(dropdownsortedvalues);
console.log(dropdowvalues);

await page.getByPlaceholder('Type to Select Countries').type('ind');
await page.waitForTimeout(5000);
let values=[];
values = await page.locator('.ui-menu .ui-menu-item-wrapper').allInnerTexts();
console.log(values);
/*for(let index in values)
{
   if(values[index]=="India")
   {
     await page.locator('.ui-menu .ui-menu-item-wrapper').nth(index).click();
   }
}*/

// let countrows=await page.locator("table[name='courses'] tbody tr").count();
// expect(count).toEqual(11)
// console.log(countrows);

page.on('dialog',(dialog)=>
{
  dialog.accept();
  //dialog.dismiss();
  console.log(dialog.message());
})

await page.locator('#alertbtn').click();

const frame=await page.frameLocator('#courses-iframe')
console.log(await frame.locator('.header-text div h2 span').allInnerTexts());
await page.pause();
})


