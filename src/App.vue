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
        :game-scale="gameScale"
        :player-a="playerA"
        :player-b="playerB"
        @win-a="redScoreIncrease"
        @win-b="blueScoreIncrease"
        :key="`board-${gameScale}`"
      />
      <player-comp
        :player="playerB"
        :score="blueScore"
        img-url="assets/image/cwh.jpg"
      />
    </div>
    <div class="game-scale">
      <p>GAME SCALE : {{ gameScale }} x {{ gameScale }}</p>
      <button @click="incGameScale">INC</button>
      <button @click="decGameScale">DEC</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import PlayerComp from '@/Player.vue';
import Board from '@/Board.vue';
import { Player } from '@/types';
import { persist } from '@/persist';

function useGameScale() {
  const MIN_GAME_SCALE = 3;
  const MAX_GAME_SCALE = 5;

  const gameScale = ref(MIN_GAME_SCALE);
  function incGameScale() {
    if (gameScale.value >= MAX_GAME_SCALE) return;
    gameScale.value++;
  }
  function decGameScale() {
    if (gameScale.value <= MIN_GAME_SCALE) return;
    gameScale.value--;
  }
  return { gameScale, incGameScale, decGameScale };
}

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

    const { gameScale, incGameScale, decGameScale } = useGameScale();

    return {
      playerA,
      playerB,
      redScore,
      redScoreIncrease,
      blueScore,
      blueScoreIncrease,
      gameScale,
      incGameScale,
      decGameScale,
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
  padding: 70px 5% 20px;
  display: grid;
  grid-template-columns: minmax(auto, 1fr) 1fr minmax(auto, 1fr);
  grid-column-gap: 30px;
  align-items: center;
  justify-items: center;
}
.game-scale {
  text-align: center;
  p {
    font-size: 24px;
    line-height: 36px;
  }
  button {
    width: 100px;
    height: 50px;
    font-size: 20px;
  }
}
</style>
