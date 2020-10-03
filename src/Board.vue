<template>
  <div class="board-container" :style="cssVar">
    <div
      v-for="(boardRow, i) of board"
      class="board-row"
      :key="`board-row-${i}`"
    >
      <div
        v-for="(tile, j) of boardRow"
        class="tile"
        :class="tile"
        :key="`tile-${(gameSize + 1) * j}`"
        @click="onClickTile(i, j)"
      >
        {{ i * gameSize + j }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export type Tile = Player | null | boolean;

export enum Player {
  A = 'player-a',
  B = 'player-b',
}

export type Board = Tile[][];

function useTurn() {
  const turn = ref(Player.A);
  function setTurn() {
    turn.value = turn.value === Player.A ? Player.B : Player.A;
  }
  return { turn, setTurn };
}

function useBoard(gameSize: number) {
  const board = ref<Board>(
    new Array(gameSize).fill(new Array(gameSize).fill(null))
  );

  function setBoard(i: number, j: number, turn: Player) {
    board.value[i][j] = turn;
    console.log('board', board.value);
    return checkWin(board.value);
  }
  return { board, setBoard };
}

function checkWin(board: Board): Player | null {
  return null;
}

export default defineComponent({
  name: 'Board',
  props: {
    gameSize: { type: Number, default: 3 },
    playerAColor: { type: String, default: 'red' },
    playerBColor: { type: String, default: 'blue' },
  },
  setup({ gameSize }) {
    const { turn, setTurn } = useTurn();
    const { board, setBoard } = useBoard(gameSize);

    function onClickTile(i: number, j: number) {
      console.log('dfhsifdaso');
      setBoard(i, j, turn.value);
      setTurn();
    }

    return { turn, board, onClickTile };
  },
  computed: {
    cssVar(): object {
      const { playerAColor, playerBColor } = this;
      return {
        '--player-a-color': playerAColor,
        '--player-b-color': playerBColor,
      };
    },
  },
});
</script>

<style scoped lang="scss">
.board-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  .board-row {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-content: stretch;
    .tile {
      cursor: pointer;
      flex: 1;
      &.player-a {
        background-color: var(--player-a-color);
      }
      &.player-b {
        background-color: var(--player-b-color);
      }
    }
  }
}
</style>
