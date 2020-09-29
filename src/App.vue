<template>
  <div>
    <div class="hihi">hello vue vue Single-File-Component</div>
    <p>{{ state.count }}</p>
    <button @click="increase">button</button>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'App',
  setup() {
    const state = reactive({ count: 0 });
    function increase() {
      state.count++;
    }
    return { state, increase };
  },
};
</script>

<style scoped lang="scss">
.hihi {
  color: aqua;
  font-size: 30px;
}
p {
  font-size: 50px;
}
</style>
