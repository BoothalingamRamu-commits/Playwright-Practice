import { test } from '@playwright/test';

test('DemoQA Date Picker', async ({ page }) => {

  await page.goto('https://demoqa.com/date-picker');
  await page.locator("#dateAndTimePickerInput").click();
  await page.locator(".react-datepicker__month-read-view").click();
  await page.locator('//div[@aria-label="Choose Thursday, July 30th, 2026"]').click();

  const timeOption = page.locator('.react-datepicker__time-list-item', { hasText: '12:00' });
    await timeOption.scrollIntoViewIfNeeded();
    await timeOption.click();

//   await page.waitForTimeout(5000);


})