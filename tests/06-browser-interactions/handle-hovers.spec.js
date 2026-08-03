import { test, expect } from '@playwright/test';

test('Hover & click', async ({ page }) => {
    test.setTimeout(60000);
    const card = await page.locator('img[alt="User Avatar"]').nth(0);
    await page.goto('https://the-internet.herokuapp.com/hovers');
    await card.hover();
    await expect(page.getByText('name: user1')).toBeVisible();

    await page.getByRole('link', { name: 'View profile' }).click();



    
});