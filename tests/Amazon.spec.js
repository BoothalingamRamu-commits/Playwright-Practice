import { test, expect } from '@playwright/test';
import amazonData from '../TestData/AmazonData.json';

test('Search mobiles and apply price range', async ({ page }) => {

    test.setTimeout(90000);

    // ==============================
    // 1. OPEN AMAZON
    // ==============================
    await page.goto('https://www.amazon.in/');

    await page.waitForTimeout(3000);


    // ==============================
    // 2. SEARCH MOBILES
    // ==============================
    const searchBox = page.locator('#twotabsearchtextbox');

    await searchBox.fill(amazonData.searchProduct);

    await page.locator('#nav-search-submit-button').click();

    await page.waitForTimeout(3000);


    // ==============================
    // 3. LOCATE PRICE SLIDERS
    // ==============================
    const minSlider = page.getByRole('slider', {
        name: 'Minimum price'
    });

    const maxSlider = page.getByRole('slider', {
        name: 'Maximum price'
    });

    await expect(minSlider).toBeVisible();
    await expect(maxSlider).toBeVisible();


    // ==============================
    // 4. DISPLAY CURRENT VALUES
    // ==============================
    console.log(
        'Minimum price:',
        await minSlider.getAttribute('aria-valuetext')
    );

    console.log(
        'Maximum price:',
        await maxSlider.getAttribute('aria-valuetext')
    );


    // ==============================
    // 5. SET MINIMUM PRICE
    // ==============================

    // First move minimum slider to beginning
    await minSlider.focus();
    await minSlider.press('Home');

    // Move until minimum reaches around ₹20,000
    for (let i = 0; i < 200; i++) {

        const priceText =
            await minSlider.getAttribute('aria-valuetext');

        const price = Number(
            priceText.replace(/[₹,\s]/g, '')
        );

        console.log('Current minimum:', price);

        if (price >= amazonData.minPrice) {
            break;
        }

        await minSlider.press('ArrowRight');
    }


    // ==============================
    // 6. SET MAXIMUM PRICE
    // ==============================

    // First move maximum slider to end
    await maxSlider.focus();
    await maxSlider.press('End');

    // Move backwards until maximum is around ₹60,000
    for (let i = 0; i < 200; i++) {

        const priceText =
            await maxSlider.getAttribute('aria-valuetext');

        const price = Number(
            priceText.replace(/[₹,\s]/g, '')
        );

        console.log('Current maximum:', price);

        if (price <= amazonData.maxPrice) {
            break;
        }

        await maxSlider.press('ArrowLeft');
    }


    // ==============================
    // 7. PRINT FINAL RANGE
    // ==============================
    const finalMin =
        await minSlider.getAttribute('aria-valuetext');

    const finalMax =
        await maxSlider.getAttribute('aria-valuetext');

    console.log('Final Minimum Price:', finalMin);
    console.log('Final Maximum Price:', finalMax);


    // ==============================
    // 8. WAIT SO WE CAN SEE SLIDER
    // ==============================
    await page.waitForTimeout(5000);


    // ==============================
    // 9. LOCATE ALL ADD TO CART BUTTONS
    // ==============================

    // Locator taken from your screenshot:
    // name="submit.addToCart"
    // aria-label="Add to cart"

    const addToCartButtons = page.locator(
        'input[name="submit.addToCart"][aria-label="Add to cart"]'
    );

    // Find how many Add to Cart buttons are available
    const count = await addToCartButtons.count();

    console.log('Available Add to Cart buttons:', count);

    // Make sure at least one product has Add to Cart
    expect(count).toBeGreaterThan(0);


    // ==============================
    // 10. DYNAMICALLY SELECT PRODUCT
    // ==============================

    // Select first available product dynamically
    const firstProduct = addToCartButtons.first();

    // Scroll to that product
    await firstProduct.scrollIntoViewIfNeeded();

    // Verify button is visible
    await expect(firstProduct).toBeVisible();

    // Click Add to Cart
    await firstProduct.click();

    console.log('Product added to cart');

    await page.waitForTimeout(3000);


    // ==============================
    // 11. VERIFY CART COUNT
    // ==============================

    // id="nav-cart-count"

    const cartCount = page.locator('#nav-cart-count');

    await expect(cartCount).toBeVisible();

    const cartItems = await cartCount.textContent();

    console.log('Cart Count:', cartItems);


    // ==============================
    // 12. OPEN CART
    // ==============================

    // id="nav-cart"

    const cart = page.locator('#nav-cart');

    await expect(cart).toBeVisible();

    await cart.click();

    await page.waitForLoadState('domcontentloaded');

    console.log('Cart page opened');


    // ==============================
    // 13. PROCEED TO BUY
    // ==============================

    // name="proceedToRetailCheckout"

    const proceedToBuy = page.locator(
        'input[name="proceedToRetailCheckout"]'
    );

    await expect(proceedToBuy).toBeVisible();

    await proceedToBuy.click();

    console.log('Proceed to Buy clicked');

    await page.waitForLoadState('domcontentloaded');

    await page.waitForTimeout(3000);


    // ==============================
    // 14. TAKE SCREENSHOT
    // ==============================

    await page.screenshot({
        path: 'screenshots/amazon-checkout.png',
        fullPage: true
    });

    console.log('Screenshot captured successfully');

});