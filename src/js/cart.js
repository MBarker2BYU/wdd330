
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

    // Show cart total if cart is not empty
    const cartFooter = document.querySelector('.cart-footer');
    if (cartItems && cartItems.length > 0) {
      // Calculate total
      const total = cartItems.reduce((sum, item) => {
        const quantity = item.quantity || 1;
        const price = item.ListPrice ? item.ListPrice : item.FinalPrice;
        return sum + price * quantity;
      }, 0);
      cartFooter.classList.remove('hide');
      cartFooter.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
    } else {
      cartFooter.classList.add('hide');
    }

  } catch (error) {
    // Handle any errors that occur during initialization
    //To be replaced with a user-friendly message    
    console.error("Error rendering cart items:", error);
  }
}

initialize();