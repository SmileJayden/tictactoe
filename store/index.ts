import Vuex from "vuex";

const store = () =>
  new Vuex.Store({
    state: {
      scoreA: 0,
      scoreB: 0
    },
    mutations: {
      incrementA(state) {
        state.scoreA++;
      },
      incrementB(state) {
        state.scoreB++;
      }
    }
  });

export default store;
