const {test, expect} = require("@playwright/test");

test("Register & Login Flows", async ({page})=>{
    //open portal and click on register
    let loginPage = "https://rahulshettyacademy.com/client/#/auth/login";
    let userEmail = "foo@bar1.com";
    let password = "foobar1%";

    await page.goto(loginPage);
    await page.locator('.btn1').click();

    // register
    await page.locator('#firstName').fill("user1");
    await page.locator('#lastName').fill("user1");
    await page.locator('#userEmail').fill(userEmail);
    await page.locator('#userMobile').fill("1234567890");
    await page.locator('.custom-select').selectOption({label: "Engineer"});
    await page.locator("input[formcontrolname='gender'][value='Male']").check();
    await page.locator('#userPassword').fill(password);
    await page.locator('#confirmPassword').fill(password);
    await page.locator("input[formcontrolname='required']").check();
    await page.locator('#login').click();

    // login
    await page.goto(loginPage);
    await page.locator('#userEmail').fill(userEmail);
    await page.locator('#userPassword').fill(password);
    await page.locator('#login').click();
    console.log(await page.locator('.card-body b').first().textContent());

});