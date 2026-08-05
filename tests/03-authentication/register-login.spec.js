const { test, expect } = require("@playwright/test");

test("Register & Login Flows", async ({ page }) => {
    //open portal and click on register
    const loginPage = "https://rahulshettyacademy.com/client/#/auth/login";
    const userEmail = `user${Date.now()}@bar.com`;
    const password = "Foobar1%";

    await page.goto(loginPage);
    await page.locator('.btn1').click();

    // register
    await page.locator('#firstName').fill("user1");
    await page.locator('#lastName').fill("user1");
    await page.locator('#userEmail').fill(userEmail);
    await page.locator('#userMobile').fill("1234567890");
    await page.locator('.custom-select').selectOption({ label: "Engineer" });
    await page.locator("input[formcontrolname='gender'][value='Male']").check();
    await page.locator('#userPassword').fill(password);
    await page.locator('#confirmPassword').fill(password);
    await page.locator("input[formcontrolname='required']").check();
    await page.locator('#login').click();
    // needed for the user to be registered before login, otherwise the test will fail
    await page.waitForTimeout(3000);

    // login
    await page.goto(loginPage);
    await page.locator('#userEmail').fill(userEmail);
    await page.locator('#userPassword').fill(password);
    await page.locator('#login').click();
        
    await expect(page.getByText('ADIDAS')).toBeVisible();
    
});