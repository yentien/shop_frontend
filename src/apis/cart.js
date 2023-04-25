import { store } from "../store";
import { request } from "../utils/request";
import { getUser } from "./auth";


export async function deleteCartProductApi(productId) {
  const userId = getUser().userId;
  const response = await request(
    `http://localhost:8080/users/${userId}/cart`,
    {
      method: "DELETE",
      auth: true,
      data: {
        productId: productId,
      }
    });

  return response.data;
}


export async function updateQuantityApi(productId, quantity) {
  const userId = getUser().userId;
  const response = await request(
    `http://localhost:8080/users/${userId}/cart`,
    {
      method: "PATCH",
      auth: true,
      data: {
        productId: productId,
        quantity: quantity
      }
    });
  return response.data;
}

export async function addItemToCartApi(product) {
  const userId = getUser().userId;
  const response = await request(
    `http://localhost:8080/users/${userId}/cart`,
    {
      method: "POST",
      auth: true,
      data: {
        userId: userId,
        productId: product.id,
        quantity: product.amount
      }
    });
  return response.data;
}

export async function getCartApi() {
  const userId = getUser().userId;
  const response = await request(
    `http://localhost:8080/users/${userId}/cart`,
    {
      method: "GET",
      auth: true,
      data: {}
    });
  return response.data;
}
