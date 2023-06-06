import { deleteCartProductApi } from "../../apis/cart";
import { addProductApi, deleteProductApi, getProductsApi, getSingleProductApi, modifyProductApi } from "../../apis/product";

export const product = {
  state() {
    return {
      productList: [],
      singleProduct: {},
      pageInfo: {}
    }
  },
  mutations: {
    setProductList(state, productList) {
      state.productList = productList;
    },
    setSingleProduct(state, singleProduct) {
      state.singleProduct = singleProduct;
    },
    setPageInfo(state, pageInfo) {
      state.pageInfo = pageInfo;
    }
  },
  actions: {
    async getProducts({ commit }, pageFilter) {
      const result = await getProductsApi(pageFilter);
      commit("setProductList", result.data);
      commit("setPageInfo", result.pageInfo)
    },
    async getSingleProduct({ commit }, { productId }) {
      const result = await getSingleProductApi(productId);
      commit("setSingleProduct", result.data);
    },
    async addProduct({ commit }, productData) {
      await addProductApi(productData);
    },
    async modifyProduct({ commit }, product) {
      await modifyProductApi(product);
    },
    async deleteProduct({ commit }, productId) {
      await deleteProductApi(productId);
    }
  },
  getters: {
    getSingleProduct: state => {
      return state.singleProduct || {};
    }
  }
};