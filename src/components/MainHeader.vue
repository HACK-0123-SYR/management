<template>
  <div class="menu">
    <div class="state-panel">
      <div class="avatar">
        <img :src="teacherInfo.portrait" />
      </div>
      <span class="name"> {{ teacherInfo.name }}</span>

      <el-dropdown @command="handleCommand">
        <span style="cursor: pointer"
          ><i class="el-icon-caret-bottom"></i
        ></span>
        <el-dropdown-menu>
          <el-dropdown-item command="center">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- <span class="other">{{ teacherInfo.email }}</span> -->
    </div>
  </div>
</template>

<script>
import router from "@/router/login";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["teacherInfo"]),
  },
  methods: {
    handleCommand(command) {
      if (command == "center") {
        this.center();
      } else {
        this.logout();
      }
    },
    center() {
      console.log("center");
      router.push({
        name: "personal",
      });
      this.$bus.$emit("off");
    },
    logout() {
      console.log("dasfsd");
      console.log(localStorage.getItem("token"));
      localStorage.removeItem("token");
      location.href = "asdfasdfasdfasdf";
      /*
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxIiwic3RhdHVzIjoidGVhY2hlciIsImlhdCI6MTY1NjgzMTc1NCwiZXhwIjoxODE0NjE5NzU0fQ.XWWoe1qBubqGT_A4FXo_7IwxLxYbLZFZNGPedWtOyQc
      */
    },
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