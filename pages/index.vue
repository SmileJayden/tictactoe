<template>
  <div class="container">
    <p>hello {{ state.hello }}</p>
    <button @click="setHello">btn</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';

export default defineComponent({
  name: 'index',
  components: {},
  setup() {
    const state = reactive({ hello: 'world' });
    function setHello() {
      state.hello = 'update world ';
    }
    const t = nedw => {
      console.log(nedw);
      return '';
    };
    return { state, setHello };
  },
});
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
