<template>
  <div class="nav">
    
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo menu"
      background-color="#d6cfe2"
      text-color="#616161"
      active-text-color="#5318a9"
    >
      <el-menu-item index="1">
        <i class="el-icon-s-shop"></i>
        <span slot="title">导航一</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex';

export default {
  data() {
    return {
      // person: {
      //   url: "/src/assets/UI/person/portrait1.png",
      // },
    };
  },
  methods:{

  },
  computed:{
    
  },
  mounted(){
    
  }
};
</script>

<style lang="less" scoped>
.nav {
  height: calc(100%);
  background-color: #d6cfe2;
  width: 160px;
  display: flex;
  // margin: 20px 20px 0 20px;
  // border-radius: 10px;

  .menu{
    position: relative;
    margin: auto;
    top: 0;
    bottom: 0;
    width: 100%;
  }
}
</style>