import ExternalServices from "./ExternalServices.mjs";

export default class CheckoutProcess {
  constructor(cart, summaryDiv) {
    this.cart = cart;
    this.summaryDiv = summaryDiv;
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.total = 0;
  }

  displaySubtotal() {
    this.subtotal = this.cart.reduce((sum, item) => {
      const quantity = item.quantity || 1;
      const price = item.ListPrice ? item.ListPrice : item.FinalPrice;
      return sum + price * quantity;
    }, 0);
    this.summaryDiv.innerHTML = `
      <h3>Order Summary</h3>
      <p>Subtotal: $${this.subtotal.toFixed(2)}</p>
    `;
  }

  calculateAndDisplayTotals(zipCode) {
    // Tax: 6% sales tax
    this.tax = this.subtotal * 0.06;
    // Shipping: $10 for first item + $2 for each additional
    const itemCount = this.cart.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0,
    );
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
    this.total = this.subtotal + this.tax + this.shipping;

    this.summaryDiv.innerHTML = `
      <h3>Order Summary</h3>
      <p>Subtotal: $${this.subtotal.toFixed(2)}</p>
      <p>Tax (6%): $${this.tax.toFixed(2)}</p>
      <p>Shipping: $${this.shipping.toFixed(2)}</p>
      <p><strong>Total: $${this.total.toFixed(2)}</strong></p>
    `;
  }

  packageItems(items) {
    // Transform items to the required format
    return items.map((item) => ({
      id: item.Id || item.id,
      name: item.Name || item.name,
      price: item.ListPrice ? item.ListPrice : item.FinalPrice,
      quantity: item.quantity || 1,
    }));
  }

  async checkout(form) {
    try {
      // convert the form into an object
      const formData = new FormData(form);
      const order = {};
      formData.forEach((value, key) => {
        order[key] = value;
      });
      // Add extra data
      order.orderDate = new Date().toISOString();
      order.items = this.packageItems(this.cart);
      order.orderTotal = this.total.toFixed(2);
      order.shipping = this.shipping;
      order.tax = this.tax.toFixed(2);

      // call ExternalServices.checkout
      const response = await ExternalServices.checkout(order);
      return response;
    } catch (err) {
      // You can show the error in the console or in the UI
      console.error("Error during checkout:", err.message);
      return { error: true, details: err.message };
    }
  }
}
