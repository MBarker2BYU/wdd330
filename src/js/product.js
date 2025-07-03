import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) 
{
  // retrieve existing cart from local storage
  let cart = getLocalStorage("so-cart") || [];

  // if cart is not an array, convert it to an array
  if(!Array.isArray(cart)) 
  {
    cart = [cart];
  }

  // Add the new product to the cart array
  cart.push(product);

  // save updated cart to local storage
  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
