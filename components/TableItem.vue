<template>
  <div class="table-item" :style="{ 'background-color': `${color}` }">
    <div class="content">
      <span class="index">{{ index }}</span> 번째 item
      <dumb :id="index" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import Dumb from '~/components/dumb.vue';

@Component({ components: { Dumb } })
export default class TableItem extends Vue {
  @Prop() index!: number;
  @Prop() color!: string;
  @Prop() id!: string;
  created() {
    for (let i = 0; i < 10000; i++) {}
    console.log('table item created');
  }
  updated() {
    for (let i = 0; i < 10000; i++) {}
    console.log('table item updated');
  }
  mounted() {
    for (let i = 0; i < 10000; i++) {}
    console.log('table item mounted');
  }
}
</script>

<style scoped>
.table-item {
  height: 150px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.content {
  height: 30px;
  line-height: 30px;
}
.index {
  padding: 20px;
  background-color: white;
  font-size: 20px;
  margin-left: 30px;
  line-height: 20px;
}
</style>
