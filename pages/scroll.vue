<template>
  <div class="container">
    <button @click="handleChange">onclick</button>
    <dumb
      :id="dumbArray[i + dumbindex].name"
      v-for="(_, i) of Array(2).fill('')"
    />
    <div id="scroll-wrapper" @scroll.passive="scrollHandler">
      <table-item
        v-for="(_, i) of Array(Math.min(items.length, 30)).fill('')"
        :color="items[scrollState.start + i].color"
        :index="items[scrollState.start + i].index"
        :id="items[scrollState.start + i].uuid"
        :key="tableItemKey(i)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import TableItem from '~/components/TableItem.vue';
import { v4 as uuid } from 'uuid';
import dumb from '~/components/dumb.vue';

interface ScrollState {
  start: number;
  end: number;
}

@Component({ components: { TableItem, dumb } })
export default class scroll extends Vue {
  mounted() {
    this.items = this.getMoreItems();
  }

  tableItemKey(key: string) {
    return `table-item-key${key}`;
  }

  getMoreItems(): any[] {
    return Array(100)
      .fill('')
      .map((_, i) => {
        return {
          ...this.generateItem(),
          index: this.currPage + i,
        };
      });
  }

  handleChange() {
    // this.dumbId = 'after changed';
    this.dumbArray[0].name = 'dirty apple';

    // this.dumbindex += 1;
    // this.flag = !this.flag;
  }

  dumbindex: number = 0;
  dumbId: string = 'before changed';
  dumbArray = [{ name: 'apple' }, { name: 'banana' }, { name: 'graph' }];

  scrollState: ScrollState = {
    start: 0,
    end: 30,
  };
  items: any[] = [];
  itemHeight: number = 153;
  wrapperHeight: number = 800;
  currPage: number = 0;
  flag: boolean = true;

  scrollHandler($event: UIEvent) {
    const scrollTop = ($event.target as HTMLDivElement)!.scrollTop;
    // console.log(scrollTop);
    if (scrollTop > 1000) {
      console.log('happend');
      if (this.flag) {
        this.scrollState.start += 1;
        this.scrollState.end += 1;
        this.flag = false;
      }
    }
  }

  generateItem(): object {
    const color: string = '#' + ((Math.random() * 0xffffff) << 0).toString(16);
    return {
      name: color,
      desc: 'Math.random()',
      color: color,
      uuid: uuid(),
    };
  }
}
</script>

<style scoped>
.container {
  background-color: #3b8070;
  padding: 100px;
}

#scroll-wrapper {
  background-color: #f5f5f5;
  height: 800px;
  overflow: auto;
}
</style>
