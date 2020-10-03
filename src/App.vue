<template>
  <div>
    <h1 class="title">TicTocToe</h1>
    <div class="game-wrapper">
      <Player
        name="Jang Dong Geon"
        :score="redScore"
        color="red"
        img-url="assets/jdg.jpg"
      />
      <div><Board :game-size="gameSize" /></div>
      <Player
        name="Cheon Woo Hee"
        :score="blueScore"
        color="blue"
        img-url="assets/cwh.jpg"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Player from '@/Player.vue';
import Board from '@/Board.vue';

export function usePersistedScore(key: string) {
  const score = ref(0);
  function increase(): void {
    score.value++;
  }
  return { score, increase };
}

export default defineComponent({
  name: 'App',
  components: {
    Player,
    Board,
  },
  setup() {
    const { score: redScore, increase: redScoreIncrease } = usePersistedScore(
      'red'
    );
    const { score: blueScore, increase: blueScoreIncrease } = usePersistedScore(
      'blue'
    );
    return { redScore, redScoreIncrease, blueScore, blueScoreIncrease };
  },
  data() {
    return {
      gameSize: 3,
    };
  },
});
</script>

<style scoped lang="scss">
.title {
  text-align: center;
  font-size: 48px;
  padding: 20px 0;
}
.game-wrapper {
  padding: 70px 100px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 30px;
}
</style>
