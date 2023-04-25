import { getUser, login, logout, register } from "../../apis/auth";
import { modifyUserApi } from "../../apis/auth";

export const user = {
  state() {
    return {
      user: getUser() || {},
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async registerUser({ commit }, { email, username, password }) {
      const user = await register(email, username, password);
      commit("setUser", user);
    },
    async loginUser({ commit }, { email, password }) {
      const user = await login(email, password);
      commit("setUser", user);
    },
    async logoutUser({ commit }) {
      logout();
      commit("setUser", {})
    },
    async modifyUser({ commit }, user) {
      const modifiedUser = await modifyUserApi(user);
      commit("setUser", modifiedUser);
    }
  },
  getters: {
    getUser: state => {
      return state.user || {};
    }
  }
};