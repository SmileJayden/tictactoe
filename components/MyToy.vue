<template>
  <div class="root">
    Root
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class MyToy extends Vue {}
</script>

<style scoped>
.root {
  color: blue;
}
</style>
