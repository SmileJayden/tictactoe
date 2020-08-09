<template>
  <div class="container">
    <button @click="handleChange">onclick</button>
    <dumb
      :id="dumbArray[i + dumbindex].name"
      v-for="(_, i) of Array(2).fill('')"
      :key="`dumb-key${i}`"
    />
    <div id="scroll-wrapper" @scroll.passive="scrollHandler">
      <div id="scroll-padding-top"></div>
      <table-item
        v-for="(item, i) of items.slice(startIndex, startIndex + amount)"
        :color="item.color"
        :index="item.index"
        :id="item.uuid"
        :key="tableItemKey(i)"
      />
      <div id="scroll-padding-bottom"></div>
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

  scrollWrapper: HTMLElement | null = null;
  scrollPaddingTop: HTMLElement | null = null;
  scrollPaddingBottom: HTMLElement | null = null;

  items: any[] = [];
  showItems: any[] = [];

  wrapperHeight: number = 0;
  currPage: number = 0;
  flag: boolean = true;

  minIndex: number = 0;
  maxIndex: number = 100;
  startIndex: number = 0;
  itemHeight: number = 150;
  amount: number = 10;
  tolerance: number = 2;

  totalHeight: number = 0;
  toleranceHeight: number = 0;
  bufferHeight: number = 0;
  bufferedItems: number = 0;
  paddingTop: number = 0;
  paddingBottom: number = 0;
  mounted() {
    this.scrollWrapper = document.getElementById('scroll-wrapper');
    this.scrollPaddingTop = document.getElementById('scroll-padding-top');
    this.scrollPaddingBottom = document.getElementById('scroll-padding-bottom');
    this.items = this.getMoreItems();
    this.wrapperHeight = this.scrollWrapper!.offsetHeight;
    console.log('this.wrapperHeight', this.wrapperHeight);

    this.totalHeight = (this.maxIndex - this.minIndex) * this.itemHeight;
    this.toleranceHeight = this.tolerance * this.itemHeight;
    if (this.scrollPaddingBottom) {
      this.scrollPaddingBottom.style.height =
        this.totalHeight - this.wrapperHeight + 'px';
    }
  }

  setHeights(currScroll?: number): void {
    const itemsAbove = Math.max(this.startIndex - this.minIndex, 0);
    this.paddingTop = itemsAbove * this.itemHeight;
    this.paddingBottom =
      this.totalHeight - this.paddingTop - this.amount * this.itemHeight;

    if (currScroll) {
    }

    if (this.scrollPaddingTop) {
      this.scrollPaddingTop.style.height = this.paddingTop + 'px';
    }
    // if (this.scrollPaddingBottom) {
    //   this.scrollPaddingBottom.style.height = this.paddingBottom + 'px';
    // }
  }

  // we want to get data [dataOffset ~ dataOffset + limit]
  getDataIndex(dataOffset: number, limit: number): [number, number] {
    const start = Math.max(this.minIndex, dataOffset);
    const end = Math.min(this.maxIndex, dataOffset + limit);
    return [start, end];
  }

  scrollHandler($event: UIEvent) {
    const scrollTop = ($event.target as HTMLDivElement)!.scrollTop;

    const startIndex = Math.floor(scrollTop / this.itemHeight);

    if (startIndex !== this.startIndex) {
      this.startIndex = startIndex;
      this.paddingTop = this.startIndex * this.itemHeight;
      if (this.scrollPaddingTop) {
        this.scrollPaddingTop.style.height = this.paddingTop + 'px';
      }
      if (this.scrollPaddingBottom) {
        this.scrollPaddingBottom.style.height =
          this.totalHeight -
          this.items.slice(startIndex, startIndex + this.amount).length *
            this.itemHeight -
          this.paddingTop +
          'px';
      }
      if (this.scrollWrapper) {
        this.scrollWrapper.scrollTo({ top: this.paddingTop });
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
  padding: 50px;
}

#scroll-wrapper {
  background-color: #f5f5f5;
  height: 825px;
  overflow: auto;
}
</style>
