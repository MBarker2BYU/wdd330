import Alert from "./Alert.mjs";  
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const alertFile = "./json/alerts.json";
const mainElement = document.getElementsByTagName("main")[0];

const alert = new Alert(mainElement, alertFile);

alert.loadAlerts();

const category = "tents";

const productData = new ProductData(category);

const listElement = document.querySelector(".product-list");

if(!listElement) {
  throw new Error("Element with class 'product-list' not found in HTML!");
} else {

    const productList = new ProductList(category, productData, listElement);

    productList.init();
}