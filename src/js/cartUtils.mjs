import { getLocalStorage } from "./utils.mjs";

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = cartItems.length;
  const countElement = document.getElementById("cart-count");
  if (countElement) {
    countElement.textContent = cartCount > 0 ? cartCount : 0;
  }
}
