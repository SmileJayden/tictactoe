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
        :class="[tile, { colored: tile }]"
        :key="`tile-${(gameScale + 1) * j}`"
        @click="onClickTile(i, j)"
      />
    </div>
  </div>
  <Modal :visible="modalState.modalVisible" @close="onCloseModal">
    <p class="modal-msg" v-html="modalState.modalMsg" />
  </Modal>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue';
import Modal from '@/Modal.vue';
import { Board, BoardStatus, Player, TurnOwner } from '@/types';
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

export function useBoard(gameScale: number) {
  const turn = ref<TurnOwner>(TurnOwner.A);
  function setTurn() {
    turn.value = turn.value === TurnOwner.A ? TurnOwner.B : TurnOwner.A;
  }

  const boardStatus = ref<BoardStatus>(BoardStatus.CONTINUE);
  const board = ref<Board>(getInitBoard(gameScale));
  function setBoard(i: number, j: number): void {
    if (board.value[i][j]) return;
    board.value[i][j] = turn.value;
    boardStatus.value = checkBoardStatus(board.value);
    if (boardStatus.value === BoardStatus.CONTINUE) setTurn();
  }
  function resetBoard() {
    board.value = getInitBoard(gameScale);
    boardStatus.value = BoardStatus.CONTINUE;
  }

  return { board, boardStatus, setBoard, resetBoard, turn, setTurn };
}

export default defineComponent({
  name: 'Board',
  components: { Modal },
  props: {
    gameScale: { type: Number, default: 3 },
    playerA: {
      type: Object as PropType<Player>,
      default: { name: 'PlayerA', color: 'red' },
    },
    playerB: {
      type: Object as PropType<Player>,
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
    } = useBoard(props.gameScale);

    const { modalState, setModalMsg, setModalVisible } = useModal();

    function onClickTile(i: number, j: number) {
      setBoard(i, j);
      switch (boardStatus.value) {
        case BoardStatus.WIN:
          switch (turn.value) {
            case TurnOwner.A:
              setModalMsg(
                `<span style="color: ${props.playerA.color}">${props.playerA.name}</span> 의 승리 입니다`
              );
              break;
            case TurnOwner.B:
              setModalMsg(
                `<span style="color: ${props.playerB.color}">${props.playerB.name}</span> 의 승리 입니다`
              );
              break;
          }
          setModalVisible(true);
          break;
        case BoardStatus.DRAW:
          setModalMsg(`무승부 입니다`);
          setModalVisible(true);
          break;
        case BoardStatus.CONTINUE:
        default:
          break;
      }
    }

    function onCloseModal() {
      if (boardStatus.value === BoardStatus.WIN) {
        switch (turn.value) {
          case TurnOwner.A:
            emit('win-a');
            break;
          case TurnOwner.B:
            emit('win-b');
            break;
        }
      }
      resetBoard();
      setTurn();
      setModalVisible(false);
    }

    return { board, turn, onClickTile, modalState, onCloseModal };
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
      &.colored {
        cursor: default;
      }
      & + .tile {
        border-left: 1px solid black;
      }
    }
  }
}
</style>

<style lang="scss">
p.modal-msg {
  font-size: 24px;
  line-height: 28px;
  span {
    font-weight: bold;
  }
}
</style>
