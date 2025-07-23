//import Alert from "./Alert.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { updateCartCount } from "./cartUtils.mjs";
import { loadHeaderAndFooter, getParam } from "./utils.mjs";

loadHeaderAndFooter();

const category = getParam("category");
const productId = getParam("product");
//const alertFile = "/json/alerts.json";

//const mainElement = document.getElementsByTagName("main")[0];

//const alert = new Alert(mainElement, alertFile);
const productData = new ExternalServices();

const listElement = document.querySelector(".product-list");

async function initialize() {
  try {
    await loadHeaderAndFooter();

    updateCartCount();

    if (productId) {
      // Render product details if product id is present
      const productDetails = new ProductDetails(productId, productData);
      await productDetails.init();
    } else {
      if (!listElement) {
        throw new Error("Element with class 'product-list' not found in HTML!");
      }
      // Set the section title to include the category
      const sectionTitle = document.querySelector(".products h2");
      if (sectionTitle && category) {
        // Capitalize first letter and replace hyphens with spaces
        const formattedCategory = category
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        sectionTitle.textContent = `Top Products: ${formattedCategory}`;
      }
      const productList = new ProductList(category, productData, listElement);
      await productList.init();
    }
  } catch (error) {
    // Handle any errors that occur during initialization
    //To be replaced with a user-friendly message
    console.error("Error loading header and footer:", error);
  }
}

initialize();
