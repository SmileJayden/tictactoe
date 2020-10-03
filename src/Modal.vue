<template>
  <teleport to="#modal-target">
    <div v-if="visible" class="modal-background" @click="$emit('close')">
      <div class="modal-container"><slot></slot></div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Modal',
  emits: ['close'],
  props: {
    visible: { default: true, type: Boolean },
  },
});
</script>

<style scoped lang="scss">
.modal-background {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  opacity: 0.3;
  background-color: black;
  .modal-container {
    margin: 200px auto;
    width: 300px;
  }
}
</style>
