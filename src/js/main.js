import Alert from "./Alert.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./cartUtils.mjs";
import { loadHeaderAndFooter } from "./utils.mjs";

loadHeaderAndFooter();

const category = "tents";
const alertFile = "./json/alerts.json";

const mainElement = document.getElementsByTagName("main")[0];

const alert = new Alert(mainElement, alertFile);
const productData = new ProductData(category);

// Try to find either .product-list or .category-list
let listElement = document.querySelector(".product-list");
if (!listElement) {
  listElement = document.querySelector(".category-list");
}

async function initialize() {
  try {
    await loadHeaderAndFooter();

    updateCartCount();

    if (!listElement) {
      throw new Error(
        "Element with class 'product-list' or 'category-list' not found in HTML!",
      );
    }

    const productList = new ProductList(category, productData, listElement);

    productList.init();

    alert.loadAlerts();
  } catch (error) {
    // Handle any errors that occur during initialization
    //To be replaced with a user-friendly message
    console.error("Error loading header and footer:", error);
  }
}

initialize();
