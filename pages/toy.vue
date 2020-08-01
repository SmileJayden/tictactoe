<template>
  <div>
    <button @click="onClick">onClick</button>
    <button @click="ArrowOnClick">ArrowOnClick</button>
    <button @click="AxiosOnClick">AxiosOnClick</button>
    <my-toy class="hih" :test="myVar1" @update:test="myVar1 = $event"></my-toy>
    <my-toy class="hih" :test.sync="myObj.a"></my-toy>
    <my-toy class="hih" :test="myVar3"></my-toy>
    <my-toy class="hih" v-model="myVar3"></my-toy>
    <div>
      <div v-for="(i, j, k, l) of myObj">{{ i }} {{ j }}{{ k }}{{ l }}</div>
    </div>
    {{ myObj.b.t }}
    <div>
      <div v-for="(i, j, k) of myArr">{{ i }} {{ j }}{{ k }}</div>
    </div>
    <button @click="handleInc">increase btn</button>
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
  myObj = { a: 11, b: { t: 123123 }, c: 33, d: 44 };
  myArr = [11, 22, 33, 44, 55];

  myVar1: string = 'from parent';
  myVar2: string = 'from parent';
  myVar3: string = 'from parent';

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

  handleInc() {
    this.myObj.b.t = Math.random();
  }
}
</script>

<style scoped>
.hih {
  color: red;
  margin: 40px;
}

button {
  width: 200px;
  height: 200px;
}
</style>
