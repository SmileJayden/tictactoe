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
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getGameRes, getInitBoard } from '@/utils';
import { Board, GameRes, Player } from '@/types';

function useBoard(gameSize: number) {
  const turn = ref(Player.A);
  function setTurn() {
    turn.value = turn.value === Player.A ? Player.B : Player.A;
  }

  const board = ref<Board>(getInitBoard(gameSize));
  function setBoard(i: number, j: number): Player | undefined {
    if (board.value[i][j]) return;

    board.value[i][j] = turn.value;

    const gameRes = getGameRes(board.value);

    switch (gameRes) {
      case GameRes.WIN:
        console.log(`${turn.value} WIN !!`);
        board.value = getInitBoard(gameSize);
        return turn.value;
      case GameRes.DRAW:
        console.log(`DRAW !!`);
        board.value = getInitBoard(gameSize);
        break;
      case GameRes.CONTINUE:
        break;
    }

    setTurn();
  }
  return { board, setBoard };
}

export default defineComponent({
  name: 'Board',
  props: {
    gameSize: { type: Number, default: 3 },
    playerAColor: { type: String, default: 'red' },
    playerBColor: { type: String, default: 'blue' },
  },
  emits: ['win-a', 'win-b'],
  setup(props, { emit }) {
    const { board, setBoard } = useBoard(props.gameSize);

    function onClickTile(i: number, j: number) {
      switch (setBoard(i, j)) {
        case Player.A:
          emit('win-a');
          break;
        case Player.B:
          emit('win-b');
          break;
        default:
          break;
      }
    }

    return { board, onClickTile };
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
  border: 1px solid black;
  .board-row {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-content: stretch;
    & + .board-row {
      border-top: 1px solid black;
    }
    .tile {
      cursor: pointer;
      flex: 1;
      &.player-a {
        background-color: var(--player-a-color);
      }
      &.player-b {
        background-color: var(--player-b-color);
      }
      &.player-a,
      &.player-b {
        cursor: default;
      }
      & + .tile {
        border-left: 1px solid black;
      }
    }
  }
}
</style>
