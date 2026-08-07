import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
    private readonly page: Page;
    private readonly productCards: Locator;
    private readonly productTitles: Locator;
    private readonly cartButton: Locator;
    private readonly ordersButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productCards = page.locator('.card-body');
        this.productTitles = page.locator('.card-body b');
        this.cartButton = page.locator("[routerlink*='cart']");
        this.ordersButton = page.locator("button[routerlink*='myorders']");
    }

    /**
     * Searches for the specified product and adds it to the cart.
     */
    public async addProductToCart(productName: string): Promise<void> {

        await expect(this.productCards.first()).toBeVisible();

        const count = await this.productCards.count();

        for (let i = 0; i < count; i++) {

            const productCard = this.productCards.nth(i);

            if (
                await productCard.locator('b').textContent() === productName
            ) {
                await productCard
                    .getByRole('button', { name: 'Add To Cart' })
                    .click();

                break;
            }
        }
    }

    /**
     * Opens the shopping cart.
     */
    public async navigateToCart(): Promise<void> {
        await this.cartButton.click();
    }

    /**
     * Opens the order history page.
     */
    public async navigateToOrders(): Promise<void> {
        await this.ordersButton.click();
    }
}