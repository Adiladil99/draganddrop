import { createStore } from "vuex";

export default createStore({
  state: {
    todoData: {},
    counter: 0,
  },
  getters: {
    getData(state) {
      console.log("get", state.todoData);
      return state.todoData;
    },
    getCounter(state) {
      return state.counter;
    },
  },
  mutations: {
    setTodoData(state, data) {
      state.todoData = data;
    },
    setTodoItem(state, item) {
      state.todoData[0].list.push(item);
    },
    async setTodoTypes(state, { findId, i }) {
      await state.todoData[i].list.push(findId);
    },
    setCounter(state) {
      state.counter++;
    },
  },
  actions: {
    createData({ commit }, data) {
      commit("setTodoData", data);
    },
    createItemToDo({ commit }, item) {
      commit("setTodoItem", item);
    },

    todoTypes({ commit }, { findId, i }) {
      commit("setTodoTypes", { findId, i });
    },
  },
  modules: {},
});
