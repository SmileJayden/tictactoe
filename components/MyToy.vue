<template>
  <div class="root">
    <span>hihi</span>
    <button id="myinput" @click="handleChangeInput">mutate button</button>
    <div>{{ test }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class MyToy extends Vue {
  @Prop({ default: 'hi' }) test!: string | number;

  handleChangeInput() {
    // this.test = 'from child';
    this.$emit('update:test', Math.random().toString());
    console.log(this);
    // console.dir(this);
  }
}
</script>

<style scoped>
.root {
  color: blue;
}
</style>
