import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly productCards: Locator;

    constructor(page: Page) {
        this.page = page;

        this.emailInput = page.locator('#userEmail');
        this.passwordInput = page.locator('#userPassword');
        this.loginButton = page.locator("[value='Login']");

        // Used to verify that login has completed successfully.
        this.productCards = page.locator('.card-body');
    }

    /**
     * Navigate to the application's login page.
     */
    public async goto(): Promise<void> {
        await this.page.goto('');
        
    }

    /**
     * Login with valid user credentials.
     */
    public async login(
        email: string,
        password: string
    ): Promise<void> {

        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        await expect(this.productCards.first()).toBeVisible();
    }
}