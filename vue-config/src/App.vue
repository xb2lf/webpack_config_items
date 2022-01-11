<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import {Home} from '@/components/index';
  export default {
    components:{
      Home,
    },
    data() {
      return {
        
      }
    },
  }
</script>

<style lang="less">
#app {
  background-color: pink;
}
</style>