<template>
  <div class="nav">
    <div class="state-panel">
      <div class="avatar">
        <img :src="teacherInfo.portrait">
      </div>
      <span class="name">{{teacherInfo.name}}</span>
      <span class="other">{{teacherInfo.email}}</span>      
    </div>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
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
      person: {
        url: "/src/assets/UI/person/portrait1.png",
      },
    };
  },
  methods:{
    ...mapActions(['testToken']),
  },
  computed:{
    ...mapState(['teacherInfo'])
  },
  mounted(){
    this.testToken()
  }
};
</script>

<style lang="less" scoped>
.nav {
  height: calc(100vh - 120px);
  background-color: #d6cfe2;
  width: 200px;
  margin: 20px 20px 0 20px;
  border-radius: 10px;
  .state-panel {
    height: 200px;
    width: 100%;
    border-bottom: 1px solid rgb(202, 202, 202);
    position: relative;
    text-align: center;
    .avatar{
      display: inline-block;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background-color: #000;
      margin-top: 35px;
      overflow: hidden;
      img{
        display: block;
        height: 100%;
        width: 100%;
      }
    }
    span{
      display: block;
    }
    .name{
      color: #ededf5;
      font-size: 15px;
      margin-top: 25px;
    }
    .other{
      color: #ededf5;
      font-size: 13px;
      margin-top: 10px;
    }
  }
}
</style>