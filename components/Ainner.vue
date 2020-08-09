<template>
  <span class="ainner" ref="ainner">
    ainnerasdjfkasdjfsjdfkasdljkfjsdklfjasldffjasd asjd
    kljasfasjdkljasdklasjdkask asd akdfjk adfsadjflas jdfjaskdjfkaslj
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';

@Component
export default class Ainner extends Vue {
  @Ref('ainner') ainner!: HTMLParagraphElement;

  mounted() {
    console.log(Math.random().toString());
    const btn = document.getElementById('unique-button');
    if (btn) console.log('btn', btn.offsetWidth);
  }
}
</script>

<style scoped>
.ainner {
  width: 300px;
  background-color: gray;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
}
</style>
