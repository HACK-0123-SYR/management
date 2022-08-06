<template>
  <div class="main">

   <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    @tab-click="handleClick"
  >

    <!-- 我的班级标签页 -->
    <el-tab-pane class="label" label="我的班级" name="first">
      <!-- 改成用路由 -->
       <el-row class="mb-4">
    <el-button type="primary" plain style="margin-top:-10px">新建班级</el-button>
<el-row>
    <el-col
      v-for="(o, index) in 2"
      :key="o"
      :span="8"
      :offset="index > 0 ? 2 : 0"
    >
      <el-card :body-style="{ padding: '0px' }">
        <!-- <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        /> -->

        <!-- 卡片头像 -->
         <el-avatar :size="50" :src="circleUrl" />

        <div style="padding: 14px">
          <span>Yummy hamburger</span>
          <div class="bottom">
            <time class="time">{{ currentDate }}</time>
            <el-button text class="button">Operating</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>



  </el-row>
    </el-tab-pane>

    <!-- 班级学情标签页 -->
    <el-tab-pane class="label" label="班级学情" name="second">Config</el-tab-pane>

  </el-tabs>
  </div>
 </template>
<style>

</style>


<script>
import { mapState } from 'vuex';
// import { ref } from 'vue'
// const currentDate = ref(new Date())
export default {
  computed:{
    ...mapState('classMap')
  }
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
.main{
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

// 班级卡片 头像
.demo-basic {
  text-align: center;
}
.demo-basic .sub-title {
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}
.demo-basic .demo-basic--circle,
.demo-basic .demo-basic--square {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.demo-basic .block:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
.demo-basic .block {
  flex: 1;
}
.demo-basic .el-col:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

</style>