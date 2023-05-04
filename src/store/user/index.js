import { adminModifyUserApi, getModifyUserApi, getUser, getUserListApi, login, logout, register } from "../../apis/auth";
import { modifyUserApi } from "../../apis/auth";

export const user = {
  state() {
    return {
      user: getUser() || {},
      userList: [],
      modifyUser: {},
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserList(state, userList) {
      state.userList = userList;
    },
    setModifyUser(state, user) {
      state.modifyUser = user;
    }
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
    },
    async getUserList({ commit }) {
      const userList = await getUserListApi();
      commit("setUserList", userList);
    },
    async getModifyUser({ commit }, userId) {
      const user = await getModifyUserApi(userId);
      commit("setModifyUser", user);
    },
    async adminModifyUser({ commit }, user) {
      await adminModifyUserApi(user);
    }
  },
  getters: {
    getUser: state => {
      return state.user || {};
    }
  }
};