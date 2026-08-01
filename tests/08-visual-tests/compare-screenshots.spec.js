import { test, expect } from '@playwright/test';

test('Compare screenshot with baseline', async ({page})=>
 {
    await page.goto('https://flightaware.com/');
    expect(await page.screenshot()).toMatchSnapshot('baseline.png');
 
 });