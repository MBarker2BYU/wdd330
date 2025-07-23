import { renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  const quantity = item.quantity || 1;
  const price = item.ListPrice ? item.ListPrice : item.FinalPrice;
  const totalPrice = (price * quantity).toFixed(2);
  const removeDeleteIcon = quantity > 1 ? "../images/minus.png" : "../images/delete.png";

  const itemCard = `<li class="cart-item">
    <div class="cart-card">
      <div class="image-container">
        <img src="${item.Image}" alt="${item.Name}">
      </div>
      <div class="card-content">
        <h2>${item.Name}</h2>
        <p>${item.Colors[0].ColorName}</p>
        <div class="card-footer">
          <div class="quantity-controls">
            <div class="quantity-control" data-id="${item.Id}">
              <button class="quantity-remove"><img src=${removeDeleteIcon} aria-label="Decrease or remove quantity" alt="Minus-Icon"></button>
              <span class="quantity-value">${quantity}</span>
              <button class="quantity-add"><img src="../images/plus.png" aria-label="Increase quantity" alt="Plus-Icon"></button>
            </div>
            <button class="delete-button">Delete</button>
          </div>
          <div class="price">
            $${totalPrice}
          </div>
        </div>
      </div>
    </div>
  </li>`;

  return itemCard;
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
