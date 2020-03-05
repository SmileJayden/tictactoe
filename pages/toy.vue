<template>
  <div>
    <button @click="onClick">onClick</button>
    <button @click="ArrowOnClick">ArrowOnClick</button>
    <button @click="AxiosOnClick">AxiosOnClick</button>
    <my-toy class="hih"></my-toy>
    <div>
      <div v-for="(i, j, k, l) of myObj">{{ i }} {{ j }}{{ k }}{{ l }}</div>
    </div>
    <div>
      <div v-for="(i, j, k) of myArr">{{ i }} {{ j }}{{ k }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import MyToy from '~/components/MyToy.vue';
import axios from 'axios';

@Component({
  components: { MyToy },
})
export default class toy extends Vue {
  myObj = { a: 11, b: 22, c: 33, d: 44 };
  myArr = [11, 22, 33, 44, 55];

  onClick() {
    console.log('this', this);
    console.dir(this);
    console.log('myArr', this.myArr);
  }

  ArrowOnClick = () => {
    console.log('this', this);
    console.dir(this);
    console.log('myArr', this.myArr);
  };

  AxiosOnClick = async () => {
    const res = await axios.get('https://www.naver.com');
    console.log('AxiosOnClick', res);
  };
}
</script>

<style scoped>
.hih {
  color: red;
}

button {
  width: 200px;
  height: 200px;
}
</style>
