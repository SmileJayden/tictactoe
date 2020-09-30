<template>
  <div>
    Child
    <div>{{ x }}, {{ y }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMousePosition } from '@/hooks';

export default defineComponent({
  name: 'Child',
  setup() {
    const { x, y } = useMousePosition();
    return { x, y };
  },
});
</script>

<style scoped></style>
