<template>
  <div>
    <div class="hihi">hello vue vue Single-File-Component</div>
    <p>{{ score }}</p>
    <child />
    <button @click="increase">inc</button>
    <button @click="decrease">dec</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useScore } from '@/hooks';
import Child from '@/Child.vue';

export default defineComponent({
  name: 'App',
  components: {
    Child,
  },
  setup() {
    const { score, increase, decrease } = useScore();
    return { score, increase, decrease };
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
