import { expect, Locator, Page } from '@playwright/test';

export class OrdersHistoryPage {
    private readonly page: Page;
    private readonly ordersTable: Locator;
    private readonly orderRows: Locator;
    private readonly orderIdText: Locator;

    constructor(page: Page) {
        this.page = page;

        this.ordersTable = page.locator('tbody');
        this.orderRows = page.locator('tbody tr');
        this.orderIdText = page.locator('.col-text');
    }

    /**
     * Opens the specified order from the order history.
     */
    public async openOrder(orderId: string): Promise<void> {

        await expect(this.ordersTable).toBeVisible();

        const rowCount = await this.orderRows.count();

        for (let i = 0; i < rowCount; i++) {

            const row = this.orderRows.nth(i);

            const currentOrderId = await row
                .locator('th')
                .textContent();

            if (orderId.includes(currentOrderId ?? '')) {

                await row
                    .getByRole('button', { name: 'View' })
                    .click();

                return;
            }
        }

        throw new Error(`Order "${orderId}" was not found.`);
    }

    /**
     * Returns the order ID displayed on the order details page.
     */
    public async getOrderId(): Promise<string> {
        return (await this.orderIdText.textContent()) ?? '';
    }
}