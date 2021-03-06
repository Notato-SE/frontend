import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  drawer: true,
  user: null,
  errors: null,
  email: null,
  otp: null,
  token: localStorage.getItem("token") || null,
};
const getters = {
  isAuthenticated: (state) => !!state.token,
  stateToken: (state) => state.token,
  stateEmail: (state) => state.email,
  stateOtp: (state) => state.otp,
  stateUser: (state) => state.user,
  stateErrors: (state) => state.errors,
};
const actions = {
  async register({ dispatch }, form) {
    var register = await axios.post("sign-up", form).catch((error) => {
      dispatch("getErrors", error.response.data);
    });
    const token = register.data.data.access_token;
    dispatch("getToken", token);
    return register;
  },
  async login({ dispatch }, form) {
    const login = await axios.post("login", form).catch((error) => {
      dispatch("getErrors", error.response.data);
    });
    const token = login.data.data.access_token;
    dispatch("getToken", token);
    return login;
  },
  async getUser({ commit }) {
    // console.log("set user");
    try {
      let response = await axios.get("profile").catch((err) => {
        // console.log(err);
      });

      commit("setUser", response.data.data);
    } catch (e) {
      // console.log(e);
    }
  },
  async logout({ commit }) {
    localStorage.removeItem("token");
    const token = null;
    commit("setToken", token);
  },
  async forgotPassword({ dispatch, commit }, email) {
    var resp = await axios
      .get("forgot-password?email=" + email)
      .catch((error) => {
        dispatch("getErrors", error.response.data);
      });
    commit("setEmail", email);
    return resp;
  },
  async createForgotPassword({ dispatch }, data) {
    var user = new FormData();
    user.append("email", data.email);
    user.append("password", data.new_password);
    dispatch("login", user);
  },
  getToken({ commit }, token) {
    // console.log(token);
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    commit("setToken", token);
  },
  getErrors({ commit }, error) {
    commit("setErrors", error);
  },
};
const mutations = {
  updateDrawer(state, payload) {
    // console.log("update store" + payload);
    state.drawer = payload;
  },
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.token = token;
  },
  setErrors(state, error) {
    // console.log('error set');
    state.errors = error;
  },
  setOtp(state, otp) {
    // console.log('otp set');
    state.otp = otp;
  },
  setEmail(state, email) {
    // console.log("email set");
    state.email = email;
  },
};
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
