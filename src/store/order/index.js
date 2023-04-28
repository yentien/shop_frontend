import { createOrderApi, getOrderListApi } from "../../apis/order";

export const order = {
  state() {
    return {
      orderList: [],
      deliver: "postOffice",
      price: 100
    }
  },
  mutations: {
    setOrderList(state, orderList) {
      state.orderList = orderList;
    },
  },
  actions: {
    async createOrder({ commit }, orderData) {
      await createOrderApi(orderData);
    },
    async getOrderList({ commit }) {
      const orderList = await getOrderListApi();
      commit("setOrderList", orderList);
    }
  },
};