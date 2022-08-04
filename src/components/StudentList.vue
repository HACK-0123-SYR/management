<template>
  <div class="wrapper">
    <div class="main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="c" :name="c" v-for="c in classSet" :key="c"></el-tab-pane>   
      </el-tabs>
      <el-table
        :data="studentList"
        height="100%"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      activeName: "",
      studentList: [],
    };
  },
  computed:{
    ...mapState(['classMap']),
    classSet(){
      let mapIterator = this.classMap.keys()
      let classSet = []
      for(let  i = mapIterator.next();!i.done;i = mapIterator.next()){
        classSet.push(i.value)
      }
      return classSet
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleClick(tab, event) {
      this.getStudent(this.activeName)
    },
    getStudent(theClass){
      this.studentList = this.classMap.get(theClass)
    },
    ...mapActions([]),
  },
  mounted() {
    // this.$nextTick(()=>{
    //   console.log(this.classMap);
    // })
  },
};
</script>

<style lang="less">
.wrapper {
  height: 100%;
  width: 100%;
  background-color: #f5f5fa;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  // padding-bottom: 30px;
  .main {
    padding: 20px;
    height: 100%;
    width: 100%;
    background-color: #fff;
    position: relative;
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
    box-sizing: border-box;
    .el-table {
      .warning-row {
        background: oldlace;
      }
      .success-row {
        background: #f0f9eb;
      }
    }
  }
}
</style>