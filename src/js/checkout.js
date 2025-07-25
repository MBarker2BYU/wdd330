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
      if (form.checkValidity()) {
        try {
          await checkout.checkout(form);
          localStorage.removeItem("so-cart");
          window.location.href = "/checkout/success.html";
        } catch (error) {
          if (error.name === "serviceError") {
            const sms = Array.isArray(error.message)
              ? error.message.join(", ")
              : error.message;
            sms.forEach((msg) => alert(msg, true));
          } else {
            alert(
              "An unexpected error occurred. Please try again later.",
              true,
            );
          }
        }
      } else {
        form.reportValidity();
      }
    });
  }
}

initialize();
