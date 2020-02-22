<template>
  <div class="container">
    <player-card :player="PlayerA" />
    <game-table :cells="cells" @cell-click="handleCellClick" />
    <player-card :player="PlayerB" />
    <el-dialog
      :visible="dialogVisible"
      :title="`[${this.turnOwner.name}] WINS!!!!!!`"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, State, Watch } from 'nuxt-property-decorator';
import PlayerCard from '~/components/PlayerCard.vue';
import GameTable from '~/components/GameTable.vue';
import { Player } from '~/models/player';
import { Cell } from '~/models/Tictactoe';

@Component({
  components: { PlayerCard, GameTable },
})
export default class Index extends Vue {
  PlayerA: Player = {
    name: 'JangDongKeon',
    imgURL:
      'https://img.sbs.co.kr/newsnet/etv/upload/2012/08/17/30000130678_700.jpg',
    score: 0,
    color: 'red',
  };

  PlayerB: Player = {
    name: 'Computer',
    imgURL:
      'https://cdn5.vectorstock.com/i/1000x1000/65/59/hacker-with-computer-avatar-character-vector-14776559.jpg',
    score: 0,
    color: 'blue',
  };

  turnOwner: Player = this.PlayerA;

  dialogVisible: boolean = false;

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
    console.log('this.cells', oldVal);
    if (
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
      //row win
      this.dialogVisible = !this.dialogVisible;
      return;
    } else if (
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
      //col win
      this.dialogVisible = !this.dialogVisible;
      return;
    } else if (
      (this.cells[0].color === this.cells[4].color &&
        this.cells[4].color === this.cells[8].color &&
        this.cells[8].color !== 'white') ||
      (this.cells[2].color === this.cells[4].color &&
        this.cells[4].color === this.cells[6].color &&
        this.cells[6].color !== 'white')
    ) {
      //cross win
      this.dialogVisible = !this.dialogVisible;
      return;
    } else if (this.cells.every(x => x.color !== 'white')) {
      //draw
      this.dialogVisible = !this.dialogVisible;
      return;
    }
  }

  handleCellClick(cell: Cell): void {
    if (cell.color !== 'white') return;
    this.cells[cell.index].color = this.turnOwner.color;
    this.turnChange();
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
