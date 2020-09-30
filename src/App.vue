<template>
  <div>
    <div class="hihi">hello vue vue Single-File-Component</div>
    <p>{{ state.count }}</p>
    <child />
    <button @click="increase">button</button>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue';
import Child from '@src/Child.vue';

export default defineComponent({
  name: 'App',
  components: {
    Child,
  },
  setup() {
    const state = reactive({ count: 0 });
    function increase(): void {
      state.count++;
    }
    return { state, increase };
  },
});
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
