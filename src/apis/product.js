import { product } from "../store/product";
import { request } from "../utils/request";

export async function deleteProductApi(productId) {
  const result = await request(
    `http://localhost:8080/admin/product/${productId}`, {
    method: "DELETE",
    auth: true,
    data: {}
  });
  return result.data;
}

export async function modifyProductApi(product) {
  const result = await request(
    `http://localhost:8080/admin/product/${product.value.productId}`, {
    method: "POST",
    auth: true,
    data: {
      productName: product.value.productName,
      category: product.value.category,
      imageUrl: product.value.imageUrl,
      price: product.value.price,
      stock: product.value.stock,
      description: product.value.description
    }
  });
  return result.data;
}

export async function addProductApi(product) {
  const result = await request("http://localhost:8080/admin/product", {
    method: "POST",
    auth: true,
    data: {
      productName: product.productName,
      category: product.category,
      imageUrl: product.imageUrl,
      price: product.price,
      stock: product.stock,
      description: product.description
    }
  });
  return result.data;
}

export async function getProductsApi(productFilter) {
  console.log(productFilter.currentPage)
  const result = await request(
    `http://localhost:8080/products?currentPage=${productFilter.currentPage}&category=${productFilter.category}`,
    {
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


