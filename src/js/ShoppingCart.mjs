import { setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./cartUtils.mjs";

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

    this.renderCart();
    this.attachEventListeners();
  }

  renderCart()
  {
    this.listElement.innerHTML = ""; // Clear the list element
    
    if (this.dataSource.length === 0) {
      this.listElement.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    this.dataSource.forEach((item, index) => {

      const itemCard = cartItemTemplate(item, item.quantity || 1); // Assuming cartItemTemplate is your function that returns the itemCard HTML
      
      this.listElement.insertAdjacentHTML("beforeend", itemCard);

    });

    this.updateCartTotal();
  }

  attachEventListeners() {
    this.listElement.addEventListener("click", (e) => {
      const target = e.target.closest("button");
      
      if (!target) return;

      let quantityControl = target.closest(".quantity-control");
      let itemId = quantityControl?.dataset.id;

      // If delete-button is clicked, find the nearest quantity-control sibling
      if (target.classList.contains("delete-button")) {

        quantityControl = target.closest(".quantity-controls")?.querySelector(".quantity-control");

        itemId = quantityControl?.dataset.id;

      }

      if (!itemId) return;

      if (target.classList.contains("quantity-add")) {

        this.updateQuantity(itemId, 1);

      } else if (target.classList.contains("quantity-remove")) {

        this.updateQuantity(itemId, -1);

      } else if (target.classList.contains("delete-button")) {

        this.removeItemFromCart(itemId);

      }
    });
  }

  updateQuantity(itemId, change) {
    // Ensure dataSource is an array before proceeding
    if (!Array.isArray(this.dataSource)) {
      this.dataSource = [];
      console.warn("dataSource is not an array, resetting to empty array.");
    }

    const itemIndex = this.dataSource.findIndex((item) => item.Id === itemId);
    
    if (itemIndex === -1) return;

    let newQuantity = (this.dataSource[itemIndex].quantity || 1) + change;

    if (newQuantity <= 0) {
      this.dataSource.splice(itemIndex, 1);
    } else {
      this.dataSource[itemIndex].quantity = newQuantity;
    }

    setLocalStorage("so-cart", this.dataSource);

    updateCartCount();

    this.renderCart();
  }

  removeItemFromCart(itemId) {
    // Find the index of the item to remove
    const itemIndex = this.dataSource.findIndex((item) => item.Id === itemId);

    if (itemIndex === -1) return;

    // Remove the item from the cart
    this.dataSource.splice(itemIndex, 1);

    // Update localStorage
    setLocalStorage("so-cart", this.dataSource);

    // Update cart count in header
    updateCartCount();

    // Re-render cart
    this.renderCart();
  }

  updateCartTotal() {
    const total = this.dataSource.reduce((sum, item) => {
      const quantity = item.quantity || 1;
      return sum + item.FinalPrice * quantity;
    }, 0);

    const totalElement = document.querySelector(".cart-total");
    if (totalElement) {
      totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
  }
}
