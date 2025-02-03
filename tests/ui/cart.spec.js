// @ts-check
import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { CartPage } from "./pages/cartPage";
import { Checkout } from "./pages/checkoutPage";

test.describe("cart", () => {

  //Verifying if the inventory page is displayed
  test.beforeEach(async ({ page }) => {
    const username = "standard_user";
    const password = "secret_sauce";

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(username, password);
    await loginPage.verifySuccessfullogin();
  });

  test("Add one product to the cart", async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.addOneProductToTheCart(
      "add-to-cart-sauce-labs-backpack",
      "remove-sauce-labs-backpack"
    );
    await cartPage.goToCart();
    await cartPage.verifySuccessfulAccessToCart();
    await cartPage.verifyProductNameAddInTheCart("Sauce Labs Backpack");
  });

  test("Remove a product from the cart", async ({ page }) => {
    const cartPage = new CartPage(page);

    await cartPage.addOneProductToTheCart(
      "add-to-cart-sauce-labs-backpack",
      "remove-sauce-labs-backpack"
    );
    await cartPage.goToCart();
    await cartPage.verifySuccessfulAccessToCart();
    await cartPage.verifyProductNameAddInTheCart("Sauce Labs Backpack");
    await cartPage.removeProductFromTheCart("remove-sauce-labs-backpack");
    await cartPage.verifyProductNameNotDisplayedInTheCart();
  });

  test("verify Checkout button", async ({ page }) => {
    const cartPage = new CartPage(page);
    const checkout = new Checkout(page);

    await cartPage.addOneProductToTheCart(
      "add-to-cart-sauce-labs-backpack",
      "remove-sauce-labs-backpack"
    );
    await cartPage.goToCart();
    await cartPage.verifySuccessfulAccessToCart();
    await cartPage.verifyProductNameAddInTheCart("Sauce Labs Backpack");
    await cartPage.goToCheckout();
    await checkout.verifySuccessfulAccessToCheckout();
  });
});
