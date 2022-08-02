<template>
  <div>
    <MainHeader />
    <MainNav />

    <el-button @click="drawer = true" type="primary" style="margin-left: 16px">
      点我打开
    </el-button>

    <el-drawer title="我是标题" :visible.sync="drawer" :direction="direction">
      <span>我来啦!</span>
    </el-drawer>

    <router-view></router-view>
  </div>
</template>

<script>
import { request } from "@/request/index.js";
import MainHeader from "@/components/MainHeader.vue";
import MainNav from "@/components/MainNav.vue";

export default {
  components: {
    MainHeader,
    MainNav,
  },
  data() {
    return {
      drawer: false,
      direction: "ltr",
    };
  },
  mounted() {
    // request({
    //   url: "/student/testToken",
    //   method: "POST",
    // }).then(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  },
};
</script>

<style>
</style>