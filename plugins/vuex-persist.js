import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'tictactoe-score',
      storage: window.localStorage,
      modules: ['scoreRed', 'scoreBlue'],
      /* your options */
    }).plugin(store);
  });
};
