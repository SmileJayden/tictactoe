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
  <Modal :visible="modalVisible" @close="onCloseModal">
    <div>From Slot</div>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Modal from '@/Modal.vue';
import { checkBoardStatus, getInitBoard } from '@/utils';
import { Board, BoardStatus, Player } from '@/types';

function useBoard(gameSize: number) {
  const turn = ref<Player>(Player.A);
  function setTurn() {
    turn.value = turn.value === Player.A ? Player.B : Player.A;
  }

  const boardStatus = ref<BoardStatus>(BoardStatus.CONTINUE);
  const board = ref<Board>(getInitBoard(gameSize));
  function setBoard(i: number, j: number): Player | undefined {
    if (board.value[i][j]) return;
    board.value[i][j] = turn.value;
    boardStatus.value = checkBoardStatus(board.value);
    if (boardStatus.value === BoardStatus.CONTINUE) setTurn();
  }
  function resetBoard() {
    board.value = getInitBoard(gameSize);
    boardStatus.value = BoardStatus.CONTINUE;
  }

  return { board, boardStatus, setBoard, resetBoard, turn, setTurn };
}

export default defineComponent({
  name: 'Board',
  components: { Modal },
  props: {
    gameSize: { type: Number, default: 3 },
    playerAColor: { type: String, default: 'red' },
    playerBColor: { type: String, default: 'blue' },
  },
  emits: ['win-a', 'win-b'],
  setup(props, { emit }) {
    const {
      board,
      boardStatus,
      resetBoard,
      setBoard,
      turn,
      setTurn,
    } = useBoard(props.gameSize);

    function onClickTile(i: number, j: number) {
      setBoard(i, j);
      switch (boardStatus.value) {
        case BoardStatus.WIN:
          switch (turn.value) {
            case Player.A:
              emit('win-a');
              break;
            case Player.B:
              emit('win-b');
              break;
          }
        case BoardStatus.DRAW:
          setModalVisible(true);
          setTurn();
          break;
        case BoardStatus.CONTINUE:
        default:
          break;
      }
    }

    const modalVisible = ref<boolean>(false);
    function setModalVisible(visible: boolean) {
      modalVisible.value = visible;
    }

    function onCloseModal() {
      setModalVisible(false);
      resetBoard();
    }

    return { board, onClickTile, modalVisible, onCloseModal };
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
