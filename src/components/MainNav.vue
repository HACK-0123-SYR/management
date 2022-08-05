<template>
  <div class="nav">
    
    <el-menu
      class="el-menu-vertical-demo menu"
      background-color="#32324e"
      text-color="#616161"
      active-text-color="#dadada"
    >
      <el-menu-item class="item" index="1" @click="$router.push({name:'studentList'})">
        <i class="el-icon-s-custom"></i>
        <span slot="title">学生管理</span>
      </el-menu-item>
      <el-menu-item class="item" index="2" @click="$router.push({name:''})">
        <i class="el-icon-s-order"></i>
        <span slot="title">题目管理</span>
      </el-menu-item>
      <el-menu-item class="item" index="3" @click="$router.push({name:''})">
        <i class="el-icon-s-management"></i>
        <span slot="title">班级管理</span>
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
  background-color: #32324e;
  width: 160px;
  display: flex;
  // margin: 20px 20px 0 20px;
  // border-radius: 10px;

  .menu{
    position: relative;
    // top: 90px;
    padding-top: 80px;
    width: 100%;
    height: 100%;
    .item{
      height: 70px;
      line-height: 70px;
      font-size: 16px;
      i{
        transform: scale(1.4);
        margin-right: 10px;
      }
    }
  }
}
</style>