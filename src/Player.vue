<template>
  <div class="container" :style="cssVar">
    <img :src="imgUrl" :alt="name" />
    <p>{{ name }}</p>
    <p>Score: {{ score }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Player',
  props: {
    imgUrl: String,
    name: String,
    color: String,
    score: Number,
  },
  computed: {
    cssVar(): object {
      return { '--color': this.color };
    },
  },
});
</script>

<style scoped lang="scss">
.container {
  box-sizing: border-box;
  border: 1px solid var(--color);
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 300px;
  text-align: center;
  img {
    object-fit: cover;
    height: 400px;
  }
  p {
    padding: 4px 0;
    font-size: 16px;
    color: white;
    background-color: var(--color);
  }
}
</style>
