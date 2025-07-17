
import { getLocalStorage, loadHeaderAndFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import { updateCartCount } from "./cartUtils.mjs";

const cartItems = getLocalStorage("so-cart");
const listElement = document.querySelector(".product-list");

async function initialize() 
{
  try {

    await loadHeaderAndFooter();

    updateCartCount();

    if (!listElement) {
      throw new Error("Element with class 'product-list' not found in HTML!");
    }

    const shoppingCart = new ShoppingCart(cartItems, listElement);
    shoppingCart.init();

  } catch (error) {
    // Handle any errors that occur during initialization
    //To be replaced with a user-friendly message    
    console.error("Error rendering cart items:", error);
  }
}

initialize();