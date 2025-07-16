
import { getLocalStorage, loadHeaderAndFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import { updateCartCount } from "./cartUtils.mjs";

// This function renders the cart contents on the cart page
// It retrieves the cart items from local storage and displays them in the HTML

loadHeaderAndFooter();

const cartItems = getLocalStorage("so-cart");

const cartListElement = document.querySelector(".product-list");
const shoppingCart = new ShoppingCart(cartItems, cartListElement);

shoppingCart.init();

updateCartCount();