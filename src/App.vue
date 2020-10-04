<template>
  <div>
    <h1 class="title">TicTocToe</h1>
    <div class="game-wrapper">
      <player-comp
        :score="redScore"
        :player="playerA"
        img-url="assets/image/jdg.jpg"
      />
      <board
        :game-size="gameSize"
        :player-a="playerA"
        :player-b="playerB"
        @win-a="redScoreIncrease"
        @win-b="blueScoreIncrease"
      />
      <player-comp
        :player="playerB"
        :score="blueScore"
        img-url="assets/image/cwh.jpg"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PlayerComp from '@/Player.vue';
import Board from '@/Board.vue';
import { Player } from '@/types';
import { persist } from '@/persist';

// TODO scalable game

function usePersistedScore(id: string) {
  const score = ref(persist.getItem<number>(id, 0));
  function increase(): void {
    persist.setItem(id, ++score.value);
  }
  return { score, increase };
}

export default defineComponent({
  name: 'App',
  components: {
    PlayerComp,
    Board,
  },
  setup() {
    const playerA: Player = {
      name: 'Jang Dong Geon',
      color: 'darkviolet',
      id: 'jdg',
    };
    const playerB: Player = { name: 'Cheon Woo Hee', color: 'blue', id: 'cwh' };

    const { score: redScore, increase: redScoreIncrease } = usePersistedScore(
      playerA.id!
    );
    const { score: blueScore, increase: blueScoreIncrease } = usePersistedScore(
      playerB.id!
    );
    return {
      playerA,
      playerB,
      redScore,
      redScoreIncrease,
      blueScore,
      blueScoreIncrease,
    };
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
  padding: 40px 0 10px;
}
.game-wrapper {
  padding: 70px 5%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 30px;
  align-items: center;
  justify-items: center;
}
</style>
