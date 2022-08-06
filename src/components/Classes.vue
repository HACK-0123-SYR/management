<template>
  <div class="main">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">banji</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"
        ><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item
      >
    </el-menu>
  </div>
</template>
<style>
</style>


<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {
    ...mapState("classMap"),
  },
};

// import { reactive, toRefs } from 'vue'

// const state = reactive({
//   circleUrl:
//     'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
//   sizeList: ['small', '', 'large'] as const,
// })

// const { circleUrl, squareUrl, sizeList } = toRefs(state)
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  min-height: 100%;
  background-color: #fff;
}

// 标签页中字体样式啥的
.demo-tabs {
  padding: 32px;
  color: #3a67b6;
  font-size: 32px;
  font-weight: 600;
}

// 班级卡片整体
.time {
  font-size: 6px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// .button {
//   padding: 0;
//   min-height: auto;
// }

.image {
  width: 100%;
  display: block;
}
</style>