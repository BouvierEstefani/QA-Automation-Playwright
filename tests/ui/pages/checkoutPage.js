const { expect } = require("@playwright/test");

export class Checkout {
  constructor(page) {
    this.page = page;
    this.firstNameLocator = page.getByTestId("firstName");
    this.lastNameLocator = page.getByTestId("lastName");
    this.postalCodeLocator = page.getByTestId("postalCode");
    this.buttonContinueLocator = page.getByTestId("continue");
    this.buttonCancelLocator = page.getByTestId("cancel");
  }

  async verifySuccessfulAccessToCheckout() {
    await expect(this.page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-one.html"
    );
    await expect(this.page.getByTestId("title")).toHaveText(
      "Checkout: Your Information"
    );
    await expect(this.firstNameLocator).toBeVisible();
    await expect(this.lastNameLocator).toBeVisible();
    await expect(this.postalCodeLocator).toBeVisible();
    await expect(this.buttonContinueLocator).toBeVisible();
    await expect(this.buttonCancelLocator).toBeVisible();
  }
}
