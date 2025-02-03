// @ts-check
import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";

test.describe("login", () => {
  //The user should be able to login successfully with valid credentials
  test("Login with valid credentials", async ({ page }) => {
    const username = "standard_user";
    const password = "secret_sauce";

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(username, password);
    const startTime = performance.now();
    await loginPage.verifySuccessfullogin();
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(1500);
  });

  //Login should fail if the user is locked-out
  test("Locked-out user error", async ({ page }) => {
    const username = "locked_out_user";
    const password = "secret_sauce";

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(username, password);

    await loginPage.verifyErrorMessage(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  //Login should fail if the credentials are invalid
  test("Invalid credential error", async ({ page }) => {
    const username = "wrongusername";
    const password = "wrongpassword";

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(username, password);

    await loginPage.verifyErrorMessage(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});
