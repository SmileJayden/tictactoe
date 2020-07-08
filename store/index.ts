export const state = () => ({
  scoreRed: 0,
  scoreBlue: 0,
  items: [],
  patients: [],
});

export const mutations = {
  incrementRed(state: any) {
    state.scoreRed++;
  },
  incrementBlue(state: any) {
    state.scoreBlue++;
  },
  updateItems(state: any, items: any[]) {
    console.log('updateItems is called');
    state.items = [...state.items, ...items];
  },
  updatePatients(state: any, patients: any[]) {
    console.log('updatePatients is called');
    state.patients = [...state.patients, ...patients];
  },
};
