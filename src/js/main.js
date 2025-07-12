import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const category = "tents";

const productData = new ProductData(category);

const listElement = document.querySelector(".product-list");

if(!listElement) {
  throw new Error("Element with class 'product-list' not found in HTML!");
} else {

    const productList = new ProductList(category, productData, listElement);

    productList.init();
}
