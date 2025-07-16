import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { updateCartCount } from "./cartUtils.mjs";

const product = "product";
const tents = "tents";

const productId = getParam(product);
const dataSource = new ProductData(tents);
const productDetails = new ProductDetails(productId, dataSource);

productDetails.init();


updateCartCount();
