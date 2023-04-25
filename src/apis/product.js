import { request } from "../utils/request";

export async function getProductsApi() {
  const result = await request("http://localhost:8080/products", {
    method: "GET",
    auth: false,
    data: {}
  });
  return result.data;
}

export async function getSingleProductApi(productId) {
  const result = await request(`http://localhost:8080/products/${productId}`, {
    method: "GET",
    auth: false,
    data: {
      productId,
    }
  });
  // console.log(result.data);
  return result.data;
}


