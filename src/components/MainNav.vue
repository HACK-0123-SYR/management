<template>
  <div class="nav">
    <div class="state-panel">
      <div class="avatar">
        <img src="@/assets/UI/person/portrait1.png">
      </div>
      <span class="name">Zireael</span>
      <span class="other">Always & Forever</span>      
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#9d88bc"
      text-color="#fff"
      active-text-color="#5318a9"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
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
export default {
  data() {
    return {
      person: {
        url: "/src/assets/UI/person/portrait1.png",
      },
    };
  },
};
</script>

<style lang="less" scoped>
.nav {
  height: calc(100vh - 120px);
  background-color: #9d88bc;
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
      color: #fff;
      font-size: 15px;
      margin-top: 25px;
    }
    .other{
      color: rgb(202, 202, 202);
      font-size: 13px;
      margin-top: 10px;
    }
  }
}
</style>