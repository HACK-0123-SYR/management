<template>
  <div class="page">
    <MainHeader />
    <MainNav />

    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { request } from "@/request/index.js";
import MainHeader from "@/components/MainHeader.vue";
import MainNav from "@/components/MainNav.vue";
import { mapActions } from 'vuex';
// import StudentList from "./StudentList.vue";

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
  methods:{
    ...mapActions(["getAllClass"])
  },
  mounted() {
    this.getAllClass()
    // request({
    //   url: "/teacher/testToken",
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

<style lang="less" scoped>
.page {
  background-color: #ededf5;
  height: 100vh;
  .view {
    height: calc(100vh - 80px);
    width: calc(100vw - 240px);
    background-color: #fff;
    position: absolute;
    right: 0;
    bottom: 0;
    overflow: auto;
  }
}
</style>>