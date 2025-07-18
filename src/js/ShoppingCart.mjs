import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const quantity = item.quantity || 1;
  const price = item.ListPrice ? item.ListPrice : item.FinalPrice;
  const totalPrice = (price * quantity).toFixed(2);
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${quantity}</p>
  <p class="cart-card__price">$${totalPrice}</p>
</li>`;

  return newItem;
}

export default class ShoppingCart {
  constructor(dataSource, listElement) {
    if (dataSource == null) {
      dataSource = [];
    }

    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const cartItems = await this.dataSource;

      //Clear the list element before rendering
      this.listElement.innerHTML = "";

      this.renderCartContents(cartItems);
    } catch (error) {
      console.error("Error initializing shopping cart:", error);
      this.listElement.innerHTML = "<p>Error loading cart items</p>";
    }
  }

  renderCartContents(cartItems) {
    renderListWithTemplate(cartItemTemplate, this.listElement, cartItems);
  }
}
