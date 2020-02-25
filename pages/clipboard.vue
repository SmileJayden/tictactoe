<template>
  <div>
    <div>
      clipboard
    </div>
    <button data-clipboard-text="1">Copy</button>
    <button data-clipboard-text="2">Copy</button>
    <button data-clipboard-text="3">Copy</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import ClipboardJS from 'clipboard';

@Component
export default class clipboard extends Vue {
  mounted() {
    let btns = document.querySelectorAll('button');
    let clipboard = new ClipboardJS(btns);

    clipboard.on('success', function(e) {
      console.log(e);
    });

    clipboard.on('error', function(e) {
      console.log(e);
    });
  }
}
</script>

<style scoped></style>
