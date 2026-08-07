import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
    private readonly page: Page;
    private readonly cartItems: Locator;
    private readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.cartItems = page.locator('div li');
        this.checkoutButton = page.getByText('Checkout');
    }

    /**
     * Returns the locator for a product in the shopping cart.
     */
    private getProductLocator(productName: string): Locator {
        return this.page.locator(`h3:has-text("${productName}")`);
    }

    /**
     * Verifies that the specified product is displayed in the cart.
     */
    public async verifyProductIsDisplayed(
        productName: string
    ): Promise<void> {

        await expect(this.cartItems.first()).toBeVisible();

        await expect(
            this.getProductLocator(productName)
        ).toBeVisible();
    }

    /**
     * Proceeds to the checkout page.
     */
    public async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }
}