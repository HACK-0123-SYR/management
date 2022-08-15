<template>
  <div class="menu">
    <div class="state-panel">
      <div class="avatar">
        <img :src="teacherInfo.portrait" />
      </div>
      <span class="name"> {{ teacherInfo.name }}</span>

      <el-dropdown>
        <span style="cursor: pointer"
          ><i class="el-icon-caret-bottom"></i
        ></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <span class="other">{{ teacherInfo.email }}</span> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["teacherInfo"]),
  },
};
</script>

<style lang="less" scoped>
.menu {
  height: 80px;
  width: calc(100% - 160px);
  float: right;
  background-color: #f6f6f6;
  .state-panel {
    height: 100%;
    width: 270px;
    // background-color: aliceblue;
    float: right;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .avatar {
      height: 45px;
      width: 45px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid #000;
      background-color: #fff;
      img {
        height: 100%;
        width: 100%;
        display: block;
      }
    }
    .name {
      display: inline-block;
      width: 100px;
      text-align: center;
      margin-left: 10px;
      color: 7f7f7f;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .arrow {
      display: block;
      float: right;
      position: relative;
      top: 2px;
      right: -10px;
      height: 0;
      width: 0;
      border: 12px solid #7f7f7f;
      border-bottom: none;
      border-right-width: 7px;
      border-left-width: 7px;
      border-right-color: transparent;
      border-left-color: transparent;
    }
  }
}
</style>