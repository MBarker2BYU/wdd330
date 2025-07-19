import Alert from "./Alert.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./cartUtils.mjs";
import { getParam, loadHeaderAndFooter } from "./utils.mjs";

loadHeaderAndFooter();

const category = getParam("category");
const alertFile = "./json/alerts.json";

const mainElement = document.getElementsByTagName("main")[0];

const alert = new Alert(mainElement, alertFile);
const productData = new ProductData();

const listElement = document.querySelector(".product-list");

async function initialize() {
  try {
    await loadHeaderAndFooter();

    updateCartCount();

    if (!listElement) {
      throw new Error("Element with class 'product-list' not found in HTML!");
    }
    const pageTitle = document.querySelector(".title");
    if (pageTitle && category) {
      const formattedCategory =
        category.charAt(0).toUpperCase() + category.slice(1);
      pageTitle.textContent = `${formattedCategory} Products`;
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
