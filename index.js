import { createApp, reactive } from 'vue';

const app = createApp({
  template: `
  <div>
    <p>Hello Vue3</p>
    <p>{{ state.count }}</p>
    <button @click="increase">button</button>
  </div>
  `,
  setup() {
    const state = reactive({ count: 0 });
    function increase() {
      state.count++;
    }
    return { state, increase };
  },
});

app.mount('#app');
