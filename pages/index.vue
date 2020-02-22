<template>
  <div class="container">
    <player-card :player="PlayerA" />
    <player-card :player="PlayerB" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, State } from "nuxt-property-decorator";
import PlayerCard from "~/components/PlayerCard.vue";
import { Player } from "~/models/player";

@Component({
  components: { PlayerCard }
})
export default class Index extends Vue {
  PlayerA: Player = {
    name: "JangDongKeon",
    imgURL:
      "https://img.sbs.co.kr/newsnet/etv/upload/2012/08/17/30000130678_700.jpg",
    score: 0
  };

  PlayerB: Player = {
    name: "Computer",
    imgURL:
      "https://cdn5.vectorstock.com/i/1000x1000/65/59/hacker-with-computer-avatar-character-vector-14776559.jpg",
    score: 0
  };
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
