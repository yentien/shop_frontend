import { addItemToCartApi, deleteCartProductApi, getCartApi, updateQuantityApi } from "../../apis/cart";

export const cart = {
  state() {
    return {
      cartProductList: [],
    }
  },
  mutations: {
    setCartProductList(state, cartProductList) {
      state.cartProductList = cartProductList;
    },
  },
  actions: {
    async getCart({ commit }) {
      const cartProductList = await getCartApi();
      commit("setCartProductList", cartProductList);
    },
    async addItemToCart({ commit }, product) {
      const cartProductList = await addItemToCartApi(product);
      commit("setCartProductList", cartProductList);
    },
    async updateQuantity({ commit }, payload) {
      const cartProductList = await updateQuantityApi(payload.productId, payload.quantity);
      commit("setCartProductList", cartProductList);
    },
    async deleteCartProduct({ commit }, productId) {
      const cartProductList = await deleteCartProductApi(productId);
      commit("setCartProductList", cartProductList);
    }
  },
  getters: {
    getCartProductList: state => {
      return state.cartProductList || [];
    }
  }
};