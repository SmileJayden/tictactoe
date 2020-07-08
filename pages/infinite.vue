<template>
  <div>
    <button @click="addItem">Add Item</button>
    <button @click="add10Item">Add 10 Item</button>
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
      <p id="sentinel">Hi sentinel</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class Infinite extends Vue {
  items = [this.generateItem(), this.generateItem(), this.generateItem()];

  mounted(): void {
    const ioCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          console.log(
            '화면에 등장 ~!,entry.isIntersecting',
            entry.isIntersecting
          );
        } else {
          console.log('화면에서 사라짐~!');
        }
      });
    };
    const ioOption: IntersectionObserverInit = {};
    const observer = new IntersectionObserver(ioCallback, ioOption);
    observer.observe(document.getElementById('sentinel')!);
  }

  addItem(): void {
    this.items = [...this.items, this.generateItem()];
  }

  add10Item(): void {
    const newItems = [];
    for (let i = 0; i < 10; i++) {
      newItems.push(this.generateItem());
    }
    console.log('newItems', newItems);
    this.items = [...this.items, ...newItems];
  }

  generateItem(): object {
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
button {
  width: 300px;
  height: 200px;
  text-align: center;
}
.container {
  text-align: center;
  padding: 30px;
  margin: 100px;
  border: 20px solid darkkhaki;
  height: 600px;
  overflow-y: auto;
  .row {
    height: 150px;
    display: flex;
    justify-content: space-evenly;
    margin: 30px 0;
    align-items: center;
    color: white;
    font-size: 30px;
  }
  #sentinel {
    background-color: #35495e;
    color: white;
  }
}
</style>
