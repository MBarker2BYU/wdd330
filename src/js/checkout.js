import { loadHeaderAndFooter } from "./utils.mjs";
import { updateCartCount } from "./cartUtils.mjs";
import CheckoutProcess from "./CheckoutProcess.js";
import { alertMessage } from "./utils.mjs"; // Import alertMessage for error display

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

  // Form submission with validation and error handling
  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (form.checkValidity()) {
        try {
          await checkout.checkout(form);
          // On success, clear cart and redirect
          localStorage.removeItem("so-cart");
          window.location.href = "/checkout/success.html";
        } catch (err) {
          // Handle server errors
          if (err.name === "servicesError") {
            // Assuming server returns an array of messages in err.message
            const messages = Array.isArray(err.message) ? err.message : [err.message.message || "Checkout failed. Please check your information."];
            messages.forEach((msg) => alertMessage(msg, true));
          } else {
            alertMessage("An unexpected error occurred. Please try again.", true);
          }
        }
      } else {
        form.reportValidity(); // Show browser validation messages
      }
    });
  }
}

initialize();