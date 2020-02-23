// import Vue from 'vue';
// import Vuex, { StoreOptions, MutationTree } from 'vuex';
//
// interface RootState {
//   scoreA: number;
//   scoreB: number;
// }
//
// Vue.use(Vuex);
//
// const store: StoreOptions<RootState> = {
//   state: {
//     scoreA: 10,
//     scoreB: 20,
//   },
// };
//
// export const mutations: MutationTree<RootState> = {
//   updateScoreA(state) {
//     state.scoreA++;
//   },
//   updateScoreB(state) {
//     state.scoreB++;
//   },
// };
//
// export default () => new Vuex.Store<RootState>(store);

export const state = () => ({
  scoreRed: 0,
  scoreBlue: 0,
});

export const mutations = {
  incrementRed(state: any) {
    state.scoreRed++;
  },
  incrementBlue(state: any) {
    state.scoreBlue++;
  },
};
