import { request } from "../utils/request";
import { getUser } from "./auth";

export async function getOrderListApi() {
  const userId = getUser().userId;
  const result = await request(`http://localhost:8080/users/${userId}/order`, {
    method: "GET",
    auth: true,
    data: {}
  });
  return result.data;
}

export async function createOrderApi(orderData) {
  const userId = getUser().userId;
  const result = await request(`http://localhost:8080/users/${userId}/order`, {
    method: "POST",
    auth: true,
    data: {
      senderName: orderData.senderName,
      senderEmail: orderData.senderEmail,
      senderPhone: orderData.senderPhone,
      recipientName: orderData.recipientName,
      recipientPhone: orderData.recipientPhone,
      recipientAddress: orderData.recipientAddress,
      remark: orderData.remark,
      shipMethod: orderData.shipMethod,
      shipFee: orderData.shipFee
    }
  });
  return result.data;
}