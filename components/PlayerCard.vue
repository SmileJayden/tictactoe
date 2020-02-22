<template>
  <div class="player-card-container">
    <img :src="player.imgURL" width="320px" height="400px" />
    <div class="name">
      {{ player.name }}
    </div>
    <div class="score">score : {{ player.score }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Player } from "~/models/player";

@Component
export default class PlayerCard extends Vue {
  @Prop({ required: true }) player!: Player;
}
</script>

<style scoped>
.player-card-container {
  width: 400px;
  height: 600px;
  padding: 40px;
}
.name {
  font-size: 30px;
}
.score {
  font-size: 30px;
}
</style>
