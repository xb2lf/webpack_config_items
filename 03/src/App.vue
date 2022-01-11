<template>
  <div id="app">
    <h1>hello webpack</h1>
    <div class="img-group">
      <img :src="ig1" alt="夏目1">
    <img :src="ig2" alt="夏目2">
    <img :src="ig3" alt="夏目3">
    </div>
    <div>{{name}}---{{age}}</div>
  </div>
</template>

<script>
// 导入图片资源
import ig1 from './img/1.jpg';
import ig2 from './img/2.png';
import ig3 from './img/3.webp';
  export default {
    data() {
      return {
         ig1,
        ig2,
        ig3,
        name: '夏目',
        age: 22
      }
    },
  }
</script>

<style lang="less">
.img-group {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  img {
    width: 200px;
    height: 200px;
  }
}
</style>