<template>
  <div>
    <div class="root">
      <p class="ref" ref="ref">hihi</p>
      <ainner class="ainner"></ainner>
    </div>
    <button @click="handleShowBtn" id="unique-button">show button</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator';
import Ainner from '~/components/Ainner.vue';

@Component({ components: { Ainner } })
export default class MyToy extends Vue {
  @Prop({ default: 'hi' }) test!: string | number;
  @Ref('ref') readonly testRef!: HTMLElement;
  @Ref('inner') readonly inner!: HTMLElement;

  show: boolean = false;

  handleShowBtn() {
    this.show = !this.show;
  }

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
  /*width: 100px;*/
}
.root {
  color: blue;
  display: flex;
}
.root.show {
}
</style>
