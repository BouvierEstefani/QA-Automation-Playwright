const { expect } = require("@playwright/test");

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInputLocator = page.getByTestId("username");
    this.passwordInputLocator = page.getByTestId("password");
    this.buttonLoginLocator = page.getByTestId("login-button");
    this.errorMessageLocator = page.getByTestId("error");
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com");
    await expect(this.usernameInputLocator).toBeVisible();
    await expect(this.passwordInputLocator).toBeVisible();
    await expect(this.buttonLoginLocator).toBeVisible();
  }

  async login(username, password) {
    await this.usernameInputLocator.fill(username);
    await this.passwordInputLocator.fill(password);
    await this.buttonLoginLocator.click();
  }

  async verifySuccessfullogin() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await expect(this.page.getByTestId("title")).toHaveText("Products");
  }

  async verifyErrorMessage(expectedErrorMessage) {
     expect(this.errorMessageLocator).toBeVisible();
     expect(this.errorMessageLocator).toHaveText(expectedErrorMessage);
    await expect(this.usernameInputLocator).toHaveCSS(
        "border-bottom-color",
        "rgb(226, 35, 26)"
      );
      await expect(this.passwordInputLocator).toHaveCSS(
        "border-bottom-color",
        "rgb(226, 35, 26)"
      );
      await expect(this.page.locator("svg").first()).toBeVisible();
      await expect(this.page.locator("svg").nth(1)).toBeVisible();
  }
}
