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
  <Modal :visible="modalState.modalVisible" @close="onCloseModal">
    <p class="modal-msg">{{ modalState.modalMsg }}</p>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue';
import Modal from '@/Modal.vue';
import { Board, BoardStatus, Player, PlayerProp } from '@/types';
import { checkBoardStatus, getInitBoard } from '@/utils';

export function useModal() {
  const modalState = reactive({
    modalMsg: '',
    modalVisible: false,
  });
  function setModalMsg(msg: string) {
    modalState.modalMsg = msg;
  }
  function setModalVisible(visible: boolean) {
    modalState.modalVisible = visible;
  }
  return { modalState, setModalMsg, setModalVisible };
}

export function useBoard(gameSize: number) {
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
    playerA: {
      type: Object as PropType<PlayerProp>,
      default: { name: 'PlayerA', color: 'red' },
    },
    playerB: {
      type: Object as PropType<PlayerProp>,
      default: { name: 'PlayerB', color: 'blue' },
    },
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

    const { modalState, setModalMsg, setModalVisible } = useModal();

    function onClickTile(i: number, j: number) {
      setBoard(i, j);
      switch (boardStatus.value) {
        case BoardStatus.WIN:
          switch (turn.value) {
            case Player.A:
              emit('win-a');
              setModalMsg(`${props.playerA.name}의 승리 입니다`);
              break;
            case Player.B:
              emit('win-b');
              setModalMsg(`${props.playerB.name}의 승리 입니다`);
              break;
          }
          setModalVisible(true);
          setTurn();
          break;
        case BoardStatus.DRAW:
          setModalMsg(`무승부 입니다`);
          setModalVisible(true);
          setTurn();
          break;
        case BoardStatus.CONTINUE:
        default:
          break;
      }
    }

    function onCloseModal() {
      setModalVisible(false);
      resetBoard();
    }

    return { board, onClickTile, modalState, onCloseModal };
  },
  computed: {
    cssVar(): object {
      const { playerA, playerB } = this;
      return {
        '--player-a-color': playerA.color,
        '--player-b-color': playerB.color,
      };
    },
  },
});

// TODO board width height minmax
</script>

<style scoped lang="scss">
.board-container {
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 400px;
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

<style>
p.modal-msg {
  font-size: 24px;
  line-height: 28px;
}
</style>
