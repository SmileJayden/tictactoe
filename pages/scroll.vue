<template>
  <div class="container">
    <button @click="handleChange">onclick</button>
    <dumb
      :id="dumbArray[i + dumbindex].name"
      v-for="(_, i) of Array(2).fill('')"
      :key="`dumb-key${i}`"
    />
    <div id="scroll-wrapper" @scroll.passive="onScroll">
      <div id="scroll-wrapper-viewport">
        <div id="scroll-wrapper-inner">
          <table-item
            v-for="(item, i) of items.slice(startIndex, startIndex + amount)"
            :color="item.color"
            :index="item.index"
            :id="item.uuid"
            :key="tableItemKey(i)"
          />
        </div>
      </div>
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
    this.dumbArray[0].name = 'dirty apple';
  }

  dumbindex: number = 0;
  dumbId: string = 'before changed';
  dumbArray = [{ name: 'apple' }, { name: 'banana' }, { name: 'graph' }];

  scrollWrapper: HTMLElement | null = null;
  scrollViewportWrapper: HTMLElement | null = null;
  scrollInnerWrapper: HTMLElement | null = null;

  items: any[] = [];
  wrapperHeight: number = 0;
  currPage: number = 0;
  flag: boolean = true;

  startIndex: number = 0;
  itemHeight: number = 150;
  amount: number = 10;
  bufferCount: number = 5;

  totalHeight: number = 0;
  mounted() {
    this.scrollWrapper = document.getElementById('scroll-wrapper');
    this.scrollViewportWrapper = document.getElementById(
      'scroll-wrapper-viewport'
    );
    this.scrollInnerWrapper = document.getElementById('scroll-wrapper-inner');
    this.items = this.getMoreItems();
    if (this.scrollViewportWrapper) {
      this.scrollViewportWrapper.style.height = this.totalHeight + 'px';
    }
  }

  onScroll($event: UIEvent) {
    const scrollTop = ($event.target as HTMLDivElement)!.scrollTop;

    requestAnimationFrame(() => {
      this.onScrollHandler(scrollTop);
    });
  }

  onScrollHandler(scrollTop: number) {
    console.log('scrollTop', scrollTop);
    let startNode = Math.floor(scrollTop / this.itemHeight) - this.bufferCount;
    startNode = Math.max(0, startNode);
    let visibleNodeCount =
      Math.ceil(this.wrapperHeight / this.itemHeight) + 2 * this.bufferCount;
    visibleNodeCount = Math.min(
      this.items.length - startNode,
      visibleNodeCount
    );
    this.startIndex = startNode;
    this.amount = visibleNodeCount;
    const offsetY = startNode * this.itemHeight;
    if (this.scrollInnerWrapper) {
      this.scrollInnerWrapper.style.transform = `translateY(${offsetY}px)`;
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
#scroll-wrapper-viewport {
  overflow: hidden;
}
#scroll-wrapper-inner {
  /*will-change: transform;*/
}
</style>
