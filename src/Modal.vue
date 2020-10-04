<template>
  <teleport to="#modal-target">
    <div v-if="visible" class="modal-overlay"></div>
    <div v-if="visible" class="modal-container" @click="$emit('close')">
      <div class="modal-inner" @click.stop="">
        <slot></slot>
        <div class="footer"><button @click="$emit('close')">확인</button></div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// TODO modal animation
// TODO visible prop two way binding

export default defineComponent({
  name: 'Modal',
  emits: ['close'],
  props: {
    visible: { default: false, type: Boolean },
  },
});
</script>

<style scoped lang="scss">
.modal-overlay,
.modal-container {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  outline: none;
}
.modal-overlay {
  z-index: 1000;
  opacity: 0.5;
  background-color: black;
}
.modal-container {
  z-index: 1005;
  .modal-inner {
    border-radius: 8px;
    background-color: white;
    margin: 250px auto;
    width: 500px;
    height: 300px;
    display: grid;
    grid-template-rows: 1fr 80px;
    align-items: center;
    justify-content: center;
    .footer {
      text-align: center;
      button {
        width: 140px;
        height: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
