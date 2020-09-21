import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
    catalogue: [],
    course: [],
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    catalogue_success(state, cat) {
      Vue.set(state, "catalogue", [...cat]);
    },
    course_success(state, course) {
      Vue.set(state, "course", [...course]);
    },
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios
          .post("http://localhost:8001/login", user)
          .then((resp) => {
            const token = resp.data.accessToken;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios
          .post("http://localhost:8001/register", user)
          .then((resp) => {
            const token = resp.data.accessToken;
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    getCatalogue({ commit }) {
      axios
        .get("http://localhost:8001/catalogue")
        .then((resp) => {
          console.log("resp-->", resp);
          const catalogue = resp.data;
          commit("catalogue_success", catalogue);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCourse({ commit }, data) {
      axios
        .get(`http://localhost:8001/course/${data.id}`)
        .then((resp) => {
          console.log("course--->", resp.data.data);
          const course = resp.data.data;
          commit("course_success", course);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
  },
  modules: {},
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
    catalogue: (state) => state.catalogue,
    getCourse: (state) => state.course,
  },
});
