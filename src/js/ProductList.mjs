import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_listing/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name}">
      <h2>${product.Brand.Name}</h2>
      <h3>${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;

    this.excludedIds = ["989CG", "880RT"];
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);

      //Filter out products without details
      let filteredProducts = list.filter(
        (product) => !this.excludedIds.includes(product.Id),
      );

      //Clear the list element before rendering
      this.listElement.innerHTML = "";

      this.renderProductList(filteredProducts);
    } catch (error) {
      console.error("Error initializing product list:", error);
      this.listElement.innerHTML = "<p>Error loading products</p>";
    }
  }

  renderProductList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
