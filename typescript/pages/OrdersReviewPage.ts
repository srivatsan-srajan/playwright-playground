import { expect, Locator, Page } from '@playwright/test';

export class OrdersReviewPage {
    private readonly page: Page;
    private readonly countryInput: Locator;
    private readonly countryResults: Locator;
    private readonly emailText: Locator;
    private readonly submitOrderButton: Locator;
    private readonly confirmationMessage: Locator;
    private readonly orderIdText: Locator;

    constructor(page: Page) {
        this.page = page;

        this.countryInput = page.locator("[placeholder*='Country']");
        this.countryResults = page.locator('.ta-results');
        this.emailText = page.locator(".user__name [type='text']").first();
        this.submitOrderButton = page.locator('.action__submit');
        this.confirmationMessage = page.locator('.hero-primary');
        this.orderIdText = page.locator('.em-spacer-1 .ng-star-inserted');
    }

    /**
     * Searches for a country and selects it from the auto-complete list.
     */
    public async searchCountryAndSelect(
        countryCode: string,
        countryName: string
    ): Promise<void> {

        await this.countryInput.pressSequentially(countryCode, {
            delay: 100
        });

        await expect(this.countryResults).toBeVisible();

        const options = this.countryResults.getByRole('button');
        const optionCount = await options.count();

        for (let i = 0; i < optionCount; i++) {

            const option = options.nth(i);

            if ((await option.textContent())?.trim() === countryName) {
                await option.click();
                return;
            }
        }

        throw new Error(
            `Country "${countryName}" was not found.`
        );
    }

    /**
     * Verifies the email displayed on the review page.
     */
    public async verifyEmail(expectedEmail: string): Promise<void> {
        await expect(this.emailText).toHaveText(expectedEmail);
    }

    /**
     * Submits the order and returns the generated order ID.
     */
    public async submitAndGetOrderId(): Promise<string> {

        await this.submitOrderButton.click();

        await expect(this.confirmationMessage).toHaveText(
            ' Thankyou for the order. '
        );

        return (await this.orderIdText.textContent())?.trim() ?? '';
    }
}