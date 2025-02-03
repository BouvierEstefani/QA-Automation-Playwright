const { expect } = require("@playwright/test");

export class CartPage {
  constructor(page) {
    this.page = page;
    this.itemQuantityLocator = page.getByTestId("item-quantity");
    this.itemDescriptionLocator = page.getByTestId("inventory-item-desc");
    this.itemPriceLocator = page.getByTestId("inventory-item-price");
    this.buttonCheckoutLocator = page.getByTestId("checkout");
    this.buttonContinueShoppingLocator = page.getByTestId("continue-shopping");
    this.cartIconLocator = page.getByTestId("shopping-cart-link");
    this.shoppingCartBadgeLocator = page.getByTestId("shopping-cart-badge");
    this.inventoryItemName = page.getByTestId("inventory-item-name");
  }

  async goToCart() {
    await this.cartIconLocator.click();
  }

  async verifySuccessfulAccessToCart() {
    await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html");
    await expect(this.page.getByTestId("title")).toHaveText("Your Cart");
    await expect(this.itemQuantityLocator).toBeVisible();
    await expect(this.itemDescriptionLocator).toBeVisible();
    await expect(this.itemPriceLocator).toBeVisible();
    await expect(this.buttonCheckoutLocator).toBeVisible();
    await expect(this.buttonContinueShoppingLocator).toBeVisible();
  }

  async addOneProductToTheCart(
    productTestIDLocator,
    removeProductTestIDLocator
  ) {
    const buttonAddToCartLocator = this.page.getByTestId(productTestIDLocator);
    await buttonAddToCartLocator.click();
    await expect(buttonAddToCartLocator).not.toBeVisible();
    const buttonRemoveLocator = this.page.getByTestId(
      removeProductTestIDLocator
    );
    await expect(buttonRemoveLocator).toBeVisible();
    await expect(buttonRemoveLocator).toHaveText("Remove");
    await expect(buttonRemoveLocator).toHaveCSS("color", "rgb(226, 35, 26)");
    await expect(buttonRemoveLocator).toHaveCSS(
      "border",
      "1px solid rgb(226, 35, 26)"
    );
    await expect(this.shoppingCartBadgeLocator).toHaveText("1");
  }

  async verifyProductNameAddInTheCart(productName) {
    await expect(this.inventoryItemName).toHaveText(productName);
  }

  async verifyProductNameNotDisplayedInTheCart() {
    await expect(this.inventoryItemName).not.toBeVisible();
  }

  async removeProductFromTheCart(removeProductTestIDLocator) {
    const buttonRemoveLocator = this.page.getByTestId(
      removeProductTestIDLocator
    );
    await expect(buttonRemoveLocator).toBeVisible();
    await buttonRemoveLocator.click();
    await expect(this.shoppingCartBadgeLocator).not.toBeVisible();
  }

  async goToCheckout() {
    await this.buttonCheckoutLocator.click();
  }
}
