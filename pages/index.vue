<template>
  <div class="container">
    <player-card :player="PlayerA" :score="$store.state.scoreRed" />
    <game-table :cells="cells" @cell-click="handleCellClick" />
    <player-card :player="PlayerB" :score="$store.state.scoreBlue" />
    <el-dialog :visible="dialogVisible" :title="dialogMsg" :show-close="false">
      <el-button @click="handleBtnClick">게임 다시하기</el-button>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Mutation, Vue, Watch } from 'nuxt-property-decorator';
import PlayerCard from '~/components/PlayerCard.vue';
import GameTable from '~/components/GameTable.vue';
import { Player } from '~/models/player';
import { Cell, enumColor } from '~/models/Tictactoe';

@Component({
  components: { PlayerCard, GameTable },
})
export default class Index extends Vue {
  @Mutation('incrementRed') incrementRed: any;
  @Mutation('incrementBlue') incrementBlue: any;

  PlayerA: Player = {
    name: 'JangDongKeon',
    imgURL:
      'https://img.sbs.co.kr/newsnet/etv/upload/2012/08/17/30000130678_700.jpg',
    color: 'red',
  };

  PlayerB: Player = {
    name: 'Computer',
    imgURL:
      'https://cdn5.vectorstock.com/i/1000x1000/65/59/hacker-with-computer-avatar-character-vector-14776559.jpg',
    color: 'blue',
  };

  turnOwner: Player = this.PlayerA;

  gameRes: string = '';
  dialogVisible: boolean = false;
  dialogMsg: string = '';

  myColor = enumColor.Blue;

  cells: Cell[] = [
    {
      index: 0,
      color: 'white',
    },
    {
      index: 1,
      color: 'white',
    },
    {
      index: 2,
      color: 'white',
    },
    {
      index: 3,
      color: 'white',
    },
    {
      index: 4,
      color: 'white',
    },
    {
      index: 5,
      color: 'white',
    },
    {
      index: 6,
      color: 'white',
    },
    {
      index: 7,
      color: 'white',
    },
    {
      index: 8,
      color: 'white',
    },
  ];

  @Watch('turnOwner', { immediate: true })
  onCellChanged(val: Player, oldVal: Player): void {
    if (
      //row win
      (this.cells[0].color === this.cells[1].color &&
        this.cells[1].color === this.cells[2].color &&
        this.cells[2].color !== 'white') ||
      (this.cells[3].color === this.cells[4].color &&
        this.cells[4].color === this.cells[5].color &&
        this.cells[5].color !== 'white') ||
      (this.cells[6].color === this.cells[7].color &&
        this.cells[7].color === this.cells[8].color &&
        this.cells[8].color !== 'white')
    ) {
      this.dialogMsg = this.getGameRes(oldVal);
      this.dialogVisible = !this.dialogVisible;
      return;
    } else if (
      //col win
      (this.cells[0].color === this.cells[3].color &&
        this.cells[3].color === this.cells[6].color &&
        this.cells[6].color !== 'white') ||
      (this.cells[1].color === this.cells[4].color &&
        this.cells[4].color === this.cells[7].color &&
        this.cells[7].color !== 'white') ||
      (this.cells[2].color === this.cells[5].color &&
        this.cells[5].color === this.cells[8].color &&
        this.cells[8].color !== 'white')
    ) {
      this.dialogMsg = this.getGameRes(oldVal);
      this.dialogVisible = !this.dialogVisible;
      return;
    } else if (
      //cross win
      (this.cells[0].color === this.cells[4].color &&
        this.cells[4].color === this.cells[8].color &&
        this.cells[8].color !== 'white') ||
      (this.cells[2].color === this.cells[4].color &&
        this.cells[4].color === this.cells[6].color &&
        this.cells[6].color !== 'white')
    ) {
      this.dialogVisible = !this.dialogVisible;
      this.dialogMsg = this.getGameRes(oldVal);
      return;
    } else if (this.cells.every(x => x.color !== 'white')) {
      //draw
      this.dialogVisible = !this.dialogVisible;
      this.dialogMsg = this.getGameRes('draw');
      return;
    }
  }

  handleCellClick(cell: Cell): void {
    if (cell.color !== 'white') return;
    this.cells[cell.index].color = this.turnOwner.color;
    this.turnChange();
  }

  handleBtnClick(): void {
    this.dialogVisible = !this.dialogVisible;
    this.resetGame();
  }

  updateScore(): void {
    if (this.gameRes === 'draw') return;
    else if (this.gameRes === 'red') this.incrementRed();
    else if (this.gameRes === 'blue') this.incrementBlue();
  }

  resetGame(): void {
    this.updateScore();
    this.cells = this.cells.map(c => {
      return { ...c, color: 'white' };
    });
  }

  getGameRes(winner: Player | string): string {
    if (winner === 'draw') {
      this.gameRes = 'draw';
      return 'DRAW!!';
    }
    this.gameRes = (winner as Player).color;
    return `${(winner as Player).name} WINS!!!!!!!!`;
  }

  turnChange(): void {
    if (this.turnOwner === this.PlayerA) {
      this.turnOwner = this.PlayerB;
    } else {
      this.turnOwner = this.PlayerA;
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
