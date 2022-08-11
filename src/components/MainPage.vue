<template>
  <div class="page">
    <div class="client">
      <MainHeader />
      <MainNav />

      <div class="view" ref="view">
        <keep-alive :include="['StudentList','Classes']">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "@/request/index.js";
import MainHeader from "@/components/MainHeader.vue";
import MainNav from "@/components/MainNav.vue";
import { mapActions } from "vuex";
import StudentList from "./StudentList.vue";
import Classes from "./Classes.vue"

export default {
  components: {
    MainHeader,
    MainNav,
    StudentList,
    Classes,
  },
  data() {
    return {
      drawer: false,
      direction: "ltr",
    };
  },
  methods: {
    ...mapActions(["getAllClass", "testToken"]),
  },
  mounted() {
    this.getAllClass();
    this.testToken();
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
  background: linear-gradient(180deg, #e0ecff, #f6e3ff 20%, #fcfdff 60%, #f6e3ff);
  // background: linear-gradient(155deg, #e0ffe2,#faffe0, #ffede3, #facffa, #bdccf8);
  height: 100vh;
  .client {
    background: linear-gradient(130deg, #e0ecff, #dfccfc);
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 85vh;
    width: 70vw;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0px 0px 20px 3px rgb(118, 118, 118);
    .view {
      height: calc(100% - 80px);
      width: calc(100% - 160px);
      background-color: #fff;
      position: absolute;
      right: 0;
      bottom: 0;
      overflow: auto;
    }
  }
}
</style>>