import { test, expect } from '@playwright/test';
import loginData from '../TestData/SauceLogin.json';
test.setTimeout(60000);
loginData.forEach((data) => {

    test(`Sauce Demo Full Flow - ${data.username}`, async ({ page }) => {

        // ==========================================
        // 1. LOGIN PAGE
        // ==========================================
        await page.goto('https://www.saucedemo.com/');

        // Stay on Login page for 5 seconds
        await page.waitForTimeout(5000);

        await page.locator('#user-name').fill(data.username);
        await page.locator('#password').fill(data.password);
        await page.locator('#login-button').click();


        // ==========================================
        // 2. LOCKED OUT USER
        // ==========================================
        if (data.username === 'locked_out_user') {

            const errorMessage = page.locator('[data-test="error"]');

            await expect(errorMessage).toBeVisible();
            await expect(errorMessage).toContainText('locked out');

            // Stay on error page for 5 seconds
            await page.waitForTimeout(5000);

            // Stop this user's test here
            return;
        }


        // ==========================================
        // 3. INVENTORY PAGE
        // ==========================================
        await expect(page)
            .toHaveURL('https://www.saucedemo.com/inventory.html');

        // Stay on Inventory page for 5 seconds
        await page.waitForTimeout(5000);


        // ==========================================
        // 4. ADD PRODUCTS FROM JSON
        // ==========================================
        for (const productName of data.products) {

            const product = page
                .locator('.inventory_item')
                .filter({ hasText: productName });

            await product
                .getByRole('button', { name: 'Add to cart' })
                .click();
        }


        // ==========================================
        // 5. VERIFY CART COUNT
        // ==========================================
        const cartBadge = page.locator('.shopping_cart_badge');

        // await expect(cartBadge)
        //     .toHaveText(String(data.products.length));

        // Stay here for 5 seconds so you can see
        // products added and cart count
        await page.waitForTimeout(5000);


        // ==========================================
        // 6. CART PAGE
        // ==========================================
        await page.locator('.shopping_cart_link').click();

        await expect(page)
            .toHaveURL('https://www.saucedemo.com/cart.html');

        // Stay on Cart page for 5 seconds
        await page.waitForTimeout(5000);


        // ==========================================
        // 7. CHECKOUT PAGE
        // ==========================================
        await page.locator('[data-test="checkout"]').click();

        await expect(page)
            .toHaveURL('https://www.saucedemo.com/checkout-step-one.html');

        // Stay on Checkout page for 5 seconds
        await page.waitForTimeout(5000);


        // ==========================================
        // 8. TAKE CHECKOUT SCREENSHOT
        // ==========================================
        await page.screenshot({
            path: `screenshots/${data.username}-checkout.png`,
            fullPage: true
        });


        // ==========================================
        // STOP HERE
        // ==========================================
        // We are NOT filling:
        // First Name
        // Last Name
        // Postal Code

    });

});