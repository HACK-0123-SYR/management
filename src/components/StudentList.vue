<template>
  <div class="wrapper">
    <div class="main">
      <el-tabs v-model="activeName" @tab-click="handleClick" style="padding: 0">
        <el-tab-pane
          :label="c"
          :name="c"
          v-for="c in classSet"
          :key="c"
        ></el-tab-pane>
      </el-tabs>
      <el-table
        :data="studentList"
        height="93%"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="student_id" label="学号" fixed="left"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="gender" label="性别"> </el-table-column>
        <el-table-column prop="process" label="学习进度"> </el-table-column>
        <el-table-column prop="grade" label="作业分数"> </el-table-column>
        <el-table-column prop="teacher_grade" label="教师评分">
        </el-table-column>
        <el-table-column width="100" fixed="right">
          <template slot-scope="scope">
            <el-button round @click="feedback(scope.row)">反馈</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name:'StudentList',
  data() {
    return {
      activeName: "",
      studentList: [],
    };
  },
  computed: {
    ...mapState(["classMap"]),
    classSet() {
      let mapIterator = this.classMap.keys();
      let classSet = [];
      for (let i = mapIterator.next(); !i.done; i = mapIterator.next()) {
        classSet.push(i.value);
      }
      return classSet;
    },
  },
  methods: {
    feedback(row){
      // console.log(row);
      this.CHANGESTU(row)
      this.$router.push({
        name:'student'
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleClick(tab, event) {
      this.getStudent(this.activeName);
    },
    getStudent(theClass) {
      this.studentList = this.classMap.get(theClass);
    },
    ...mapActions([]),
    ...mapMutations(["CHANGESTU",])
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
      .feedback {
        width: 50px;
      }
    }
  }
}
</style>