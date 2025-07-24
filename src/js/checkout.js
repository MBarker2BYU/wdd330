import { loadHeaderAndFooter } from "./utils.mjs";
import { updateCartCount } from "./cartUtils.mjs";
import CheckoutProcess from "./CheckoutProcess.js";
import { alertMessage } from "./utils.mjs";

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
      // manual form validation
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const result = await checkout.checkout(form);
      console.log(result);
      // Happy path: clear cart and redirect to success page
      if (result.orderId && result.message === "Order Placed") {
        localStorage.removeItem("so-cart");
        window.location.href = "success.html";
        return;
      }
      // Unhappy path: show backend errors as popup alerts
      // Show any error properties as popup alerts
      if (result.error && result.details) {
        if (typeof result.details === "object") {
          for (const key in result.details) {
            alertMessage(result.details[key]);
          }
        } else {
          alertMessage(result.details);
        }
      } else if (typeof result === "object" && !result.orderId) {
        for (const key in result) {
          alertMessage(result[key]);
        }
      }
    });
  }
}

initialize();
