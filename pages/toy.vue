<template>
  <div>
    <div>
      <div v-for="(i, j, k, l) of myObj">{{ i }} {{ j }}{{ k }}{{ l }}</div>
    </div>
    {{ myObj.b.t }}
    <div>
      <div v-for="(i, j, k) of myArr">{{ i }} {{ j }}{{ k }}</div>
    </div>

    <client-only>
      <my-toy :test="'sadjfasdjflksjdljd'"></my-toy>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator';
import MyToy from '~/components/MyToy.vue';
import inner from '~/components/inner.vue';
import axios from 'axios';

@Component({
  components: { MyToy, inner },
})
export default class toy extends Vue {
  myObj = { a: 11, b: { t: 123123 }, c: 33, d: 44 };
  myArr = [11, 22, 33, 44, 55];

  myVar1: string = 'from parent';
  myVar2: string = 'from parent';
  myVar3: string = 'from parent';
}
</script>

<style scoped>
.hih {
  margin: 40px;
}

button {
  width: 200px;
  height: 200px;
}
</style>
