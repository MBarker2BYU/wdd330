import { setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./cartUtils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);

      if (!this.product) {
        throw new Error("Product not found");
      }

      this.renderProductDetails();

      const addToCartButton = document.getElementById("addToCart");

      if (addToCartButton) {
        addToCartButton.addEventListener(
          "click",
          this.addProductToCart.bind(this),
        );
      } else {
        console.error("Add to Cart button not found");
      }
    } catch (error) {
      console.error("Error initializing product details:", error);
      document.querySelector("main").innerHTML =
        "<p>Error loading product details</p>";
    }
  }

  addProductToCart() {
    try {
      let cart = JSON.parse(localStorage.getItem("so-cart")) || [];

      if (!Array.isArray(cart)) {
        cart = [cart].filter((item) => item); //Remove any null values.
      }

      cart.push(this.product);

      setLocalStorage("so-cart", cart);

      updateCartCount(); // Update the cart count in the UI

      console.log("Cart updated:", cart);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  renderProductDetails() {
    // Select the main container for product details
    const mainElement = document.querySelector("main");

    // Check if product details are available
    if (!this.product || !this.product.Brand || !this.product.Colors) {
      mainElement.innerHTML = "<p>Product details are not available</p>";
      return;
    }
    console.log("Image:", this.product.Image);


    // Generate HTML for product details using product data
    mainElement.innerHTML = `
      <section class="product-detail">
        <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img
          class="divider"
          src="${this.product.Image}"
          alt="${this.product.NameWithoutBrand}"
        />
        <p class="product-card__price">$${this.product.ListPrice}</p>
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${this.productId}">Add to Cart</button>
        </div>
      </section>
    `;
  }
}
