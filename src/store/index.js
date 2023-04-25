import { createStore } from "vuex";

import { user } from "./user";
import { order } from "./order";
import { product } from "./product";
import { cart } from "./cart";


export const store = createStore({
  modules: {
    user,
    order,
    product,
    cart,
  },
  state() { },
  mutations: {},
  actions: {},
});