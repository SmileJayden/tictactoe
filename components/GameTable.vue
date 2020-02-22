<template>
  <div class="game-table-container">
    <div
      v-for="cell in cells"
      :style="`background-color: ${cell.color}`"
      class="cell"
      @click="$emit('cell-click', cell)"
    ></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { Cell } from '~/models/Tictactoe';

@Component
export default class GameTable extends Vue {
  @Prop({ required: true }) cells!: Cell[];
}
</script>

<style scoped>
.game-table-container {
  display: grid;
  grid-template-columns: repeat(3, 101px);
  grid-template-rows: repeat(3, 101px);
}

.cell {
  border: solid 1px black;
  width: 100px;
  height: 100px;
}
</style>
