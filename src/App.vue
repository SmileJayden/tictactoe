<template>
  <div>
    <h1 class="title">TicTocToe</h1>
    <div class="game-wrapper">
      <Player :score="redScore" :player="playerA" img-url="assets/jdg.jpg" />
      <Board
        :game-size="gameSize"
        :player-a="playerA"
        :player-b="playerB"
        @win-a="redScoreIncrease"
        @win-b="blueScoreIncrease"
      />
      <Player :player="playerB" :score="blueScore" img-url="assets/cwh.jpg" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Player from '@/Player.vue';
import Board from '@/Board.vue';
import { PlayerProp } from '@/types';

// TODO persist

// TODO scalable game

function usePersistedScore(key: string) {
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
      'playera'
    );
    const { score: blueScore, increase: blueScoreIncrease } = usePersistedScore(
      'playerb'
    );
    return { redScore, redScoreIncrease, blueScore, blueScoreIncrease };
  },
  data() {
    return {
      gameSize: 3,
    };
  },
  computed: {
    playerA(): PlayerProp {
      return { name: 'Jang Dong Geon', color: 'darkviolet' };
    },
    playerB(): PlayerProp {
      return { name: 'Cheon Woo Hee', color: 'blue' };
    },
  },
});
</script>

<style scoped lang="scss">
.title {
  text-align: center;
  font-size: 48px;
  padding: 40px 0 10px;
}
.game-wrapper {
  padding: 70px 10%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 30px;
  align-items: center;
  justify-items: center;
}
</style>
