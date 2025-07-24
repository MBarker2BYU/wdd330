import { loadHeaderAndFooter } from "./utils.mjs";
import { updateCartCount } from "./cartUtils.mjs";
import CheckoutProcess from "./CheckoutProcess.js";

async function initialize() {
  await loadHeaderAndFooter();
  updateCartCount();

  // Get cart items from localStorage
  const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  const summaryDiv = document.getElementById("order-summary");

  // Create instance and display subtotal
  const checkout = new CheckoutProcess(cart, summaryDiv);
  checkout.displaySubtotal();

  // Event to calculate totals when entering the zip code
  const zipInput = document.getElementById("zip");
  if (zipInput) {
    zipInput.addEventListener("change", (e) => {
      checkout.calculateAndDisplayTotals(e.target.value);
    });
  }

  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const result = await checkout.checkout(form);
      console.log(result);
    });
  }
}

initialize();
