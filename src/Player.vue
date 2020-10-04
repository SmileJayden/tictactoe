<template>
  <div class="container" :style="cssVar">
    <img :src="imgUrl" :alt="player.name" />
    <p>{{ player.name }}</p>
    <p>Score: {{ score }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Player } from '@/types';

export default defineComponent({
  name: 'Player',
  props: {
    player: {
      type: Object as PropType<Player>,
      default: { name: 'Player', color: 'red' },
    },
    imgUrl: { type: String, required: true },
    score: Number,
  },
  computed: {
    cssVar(): object {
      return { '--color': this.player.color };
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
    font-size: 20px;
    line-height: 28px;
    color: white;
    background-color: var(--color);
  }
}
</style>
