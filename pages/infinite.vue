<template>
  <div class="container">
    <div
      class="row"
      v-for="(item, i) in items"
      :style="{ 'background-color': item.color }"
    >
      <p>{{ i }} 번째</p>
      <div>{{ item.name }}</div>
      <div>{{ item.desc }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class Infinite extends Vue {
  items = [this.getnerateItem(), this.getnerateItem()];

  getnerateItem(): object {
    const color: string = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
    return {
      name: color,
      desc: 'Math.random()',
      color: color,
    };
  }
}
</script>

<style scoped lang="scss">
.container {
  text-align: center;
  padding: 30px;
  margin: 100px;
  border: 20px solid darkkhaki;
  height: 500px;
  .row {
    height: 150px;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 30px;
    align-items: center;
    color: white;
    font-size: 30px;
  }
}
</style>
