import { createOrderApi, deleteOrderApi, getAllOrderListApi, getOrderListApi } from "../../apis/order";

export const order = {
  state() {
    return {
      orderList: [],
      deliver: "postOffice",
      price: 100,
      allOrderList: [],
    }
  },
  mutations: {
    setOrderList(state, orderList) {
      state.orderList = orderList;
    },
    setAllOrderList(state, orderList) {
      state.allOrderList = orderList;
    },
  },
  actions: {
    async createOrder({ commit }, orderData) {
      await createOrderApi(orderData);
    },
    async getOrderList({ commit }) {
      const orderList = await getOrderListApi();
      commit("setOrderList", orderList);
    },
    async getAllOrderList({ commit }) {
      const orderList = await getAllOrderListApi();
      commit("setAllOrderList", orderList);
    },
    async deleteOrder({ commit }, orderId) {
      await deleteOrderApi(orderId);
    }
  },
};