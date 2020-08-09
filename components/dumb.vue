<template>
  <p>{{ id }}</p>
</template>

<script lang="ts">
export default {
  name: 'Dumb',
  props: ['id'],
  // created() {
  //   for (let i = 0; i < 10000; i++) {}
  //   console.log('dumb created');
  // },
  // updated() {
  //   for (let i = 0; i < 10000; i++) {}
  //   console.log('dumb updated');
  // },
  // mounted() {
  //   for (let i = 0; i < 10000; i++) {}
  //   console.log('dumb mounted');
  // },
};
</script>

<style scoped></style>
