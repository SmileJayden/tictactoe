<template>
  <div class="root">
    Root
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class MyToy extends Vue {
  myObj = { a: 1, b: 2, c: 2, d: 2, e: 2, f: 2, g: 2, h: 2, i: 2 };
}
</script>

<style scoped>
.root {
  color: blue;
}
</style>
