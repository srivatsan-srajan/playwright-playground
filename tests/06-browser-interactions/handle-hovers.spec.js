import { test, expect } from '@playwright/test';

test('Hover & click', async ({ page }) => {
    
    await page.goto('https://the-internet.herokuapp.com/hovers');
    const card = await page.locator('img[alt="User Avatar"]').nth(0);
    await card.hover();
    await expect(page.getByText('name: user1')).toBeVisible();

    await page.getByRole('link', { name: 'View profile' }).click();

});