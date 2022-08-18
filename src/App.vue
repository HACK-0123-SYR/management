<template>
  <div id="app">
    <!-- <Login></Login> -->
    <!-- <router-view></router-view> -->
    <MainPage />
  </div>
</template>
<script>
import Login from "./views/login/index.vue";
// import Login from './views/login/index.vue'
import MainPage from "@/components/MainPage.vue";
export default {
  name: "App",
  components: { Login, MainPage },
};
</script>
<style lang="less">
html,
body {
  user-select: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
textarea {
  min-height: 185px !important;
}
.form-textarea textarea {
  min-height: 70px !important;
}
.reject textarea {
  border-color: #d94646 !important;
}
.reject::after {
  content: "请填写反馈信息";
  color: #d94646;
  font-size: 12px;
  /* line-height: 1; */
  /* padding-top: 4px; */
  position: absolute;
  bottom: -5px;
  left: 25px;
}
.p {
  font-size: 15px;
  display: block;
  height: 25px;
  line-height: 25px;
}
.add-selection .el-input__inner {
  height: 40px !important;
  line-height: 40px !important;
}
.el-collapse {
  border: none !important;
}
.el-collapse-item {
  .el-collapse-item__header {
    font-size: 20px !important;
    height: 80px !important;
    font-weight: bolder !important;
    margin-bottom: 20px;
    border: 1px solid #ebeef5 !important;
    border-radius: 10px !important;
    background-color: rgb(249, 249, 249) !important;
    &::before {
      content: "\e600";

      font-family: "iconfont" !important;
      font-style: normal;
      font-weight: normal;
      font-size: 25px;
      -webkit-font-smoothing: antialiased;
      padding: 0 20px;
      padding-right: 15px;
      color: #4e09ba;
    }
  }
  &:nth-child(2) {
    .el-collapse-item__header::before {
      content: "\e653";
    }
  }
  &:nth-child(3) {
    .el-collapse-item__header::before {
      content: "\e711";
    }
  }
}
</style>
