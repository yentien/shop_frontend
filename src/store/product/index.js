import { getProductsApi, getSingleProductApi } from "../../apis/product";

export const product = {
  state() {
    return {
      productList: [],
      singleProduct: {},
    }
  },
  mutations: {
    setProductList(state, productList) {
      state.productList = productList;
    },
    setSingleProduct(state, singleProduct) {
      state.singleProduct = singleProduct;
    }
  },
  actions: {
    async getProducts({ commit }) {
      const productList = await getProductsApi();
      commit("setProductList", productList);
    },
    async getSingleProduct({ commit }, { productId }) {
      const singleProduct = await getSingleProductApi(productId);
      commit("setSingleProduct", singleProduct);
    },
  },
  getters: {
    getSingleProduct: state => {
      return state.singleProduct || {};
    }
  }
};