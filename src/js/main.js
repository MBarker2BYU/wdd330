import Alert from "./Alert.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./cartUtils.mjs";
import { loadHeaderAndFooter } from "./utils.mjs";

loadHeaderAndFooter();

const category = "tents";
const alertFile = "./json/alerts.json";

const mainElement = document.getElementsByTagName("main")[0];

const alert = new Alert(mainElement, alertFile);
const productData = new ExternalServices(category);

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

    // Only render products if .product-list is present
    if (document.querySelector(".product-list")) {
      const productList = new ProductList(category, productData, listElement);
      productList.init();
    }
    // If .category-list is present, do not render products

    alert.loadAlerts();
  } catch (error) {
    // Handle any errors that occur during initialization
    //To be replaced with a user-friendly message
    console.error("Error loading header and footer:", error);
  }
}

initialize();
