const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id, category) {
    const products = await this.getData(category);
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  static async checkout(order) {
    const url = "https://wdd330-backend.onrender.com/checkout";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    };
    const response = await fetch(url, options);
    return convertToJson(response); // Use convertToJson for consistent error handling
  }
}