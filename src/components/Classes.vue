<template>
  <div class="main">
    
  </div>
</template>

<script>
import { mapState } from 'vuex';


export default {
  computed:{
    ...mapState('classMap')
  }
};
</script>

<style lang="less" scoped>
.main{
  width: 100%;
  min-height: 100%;
  background-color: #fff;
}
</style>