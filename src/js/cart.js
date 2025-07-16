import { getLocalStorage, loadHeaderAndFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import { updateCartCount } from "./cartUtils.mjs";

// This function renders the cart contents on the cart page
// It retrieves the cart items from local storage and displays them in the HTML

// Load the header and footer before initializing the shopping cart
// This ensures that the cart count is updated correctly after the header and footer are rendered
loadHeaderAndFooter().then(() => {
  updateCartCount();
});

const cartItems = getLocalStorage("so-cart");

const cartListElement = document.querySelector(".product-list");
const shoppingCart = new ShoppingCart(cartItems, cartListElement);

shoppingCart.init();

updateCartCount();
