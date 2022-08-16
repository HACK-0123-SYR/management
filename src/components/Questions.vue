<template>
  <div class="main">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item
        :index="type.type.toString()"
        v-for="type in types"
        :key="type.type"
        >{{ type.name }}</el-menu-item
      >
    </el-menu>

    <!-- 
    answer: Array(1)
    0: 1
    length: 1
    __ob__: Observer {value: Array(1), shallow: false, mock: false, dep: Dep, vmCount: 0}
    [[Prototype]]: Array
    contnet: "小牛因网络刷单被骗五万元，他觉得网络诈骗就要找网警报案，于是就通过网络搜索联系到了一名网络警察处理。请问他的做法是："
    explain: ""
    selections: Array(2)
    0: "对"
    1: "错"
    length: 2
    __ob__: Observer {value: Array(2), shallow: false, mock: false, dep: Dep, vmCount: 0}
    [[Prototype]]: Array
    type: 0
    _id: "62f72a08bc1b9433cb4a1373"
    -->

    <el-card
      class="box-card"
      v-for="(question, i) in questions"
      :key="question._id"
    >
      <div slot="header" class="clearfix">
        <!-- <span>卡片名称</span> -->
        <el-button
          style="float: right; padding: 3px 0px 3px 3px"
          type="text"
          @click="deleteQuestion(question, i)"
          >移除题目</el-button
        >
        <el-button
          style="float: right; padding: 3px 3px 3px 0px"
          type="text"
          @click="showDialog(question, i)"
          >编辑题目</el-button
        >
      </div>
      <div class="text item content">
        {{ question.contnet }}
      </div>
      <div
        v-for="(selection, index) in question.selections"
        :key="selection"
        class="text item"
        :class="{ 'right-answer': question.answer.indexOf(index) != -1 }"
      >
        {{ alpha[index] }}: {{ selection }}
      </div>
      <div class="explain">
        <div class="text item">题目解析:</div>
        <div class="text">
          {{ question.explain ? question.explain : "无" }}
        </div>
      </div>
    </el-card>

    <el-dialog
      title="编辑题目"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
      
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="题目内容">
          <el-input
            type="textarea"
            v-model="form.contnet"
            class="form-textarea"
          ></el-input>
        </el-form-item>
        <div class="selections-form">
          <div class="label">选项</div>
          <div class="selections">
            <div
              class="selection"
              v-for="(selection, index) in form.selections"
              :key="index"
            >
              <el-input v-model="form.selections[index]"> </el-input>
              <div
                class="remove-selection"
                @click="removeSelection(index)"
              ></div>
            </div>
            <!-- <div class="remove-selection">
              <i class="el-icon-remove-outline"></i>
            </div> -->
          </div>
        </div>
        <!-- <el-form-item label="选项">
          <el-input v-model="form.name"></el-input>
        </el-form-item> -->
        <el-form-item label="答案">
          <el-checkbox-group v-model="form.answer"
            ><!-- :min="1"-->
            <el-checkbox
              :label="index"
              name="answer"
              v-for="(a, index) in alpha"
              :key="index"
              :disabled="index >= form.selections.length"
            >
              {{ a }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="题目解析">
          <el-input
            type="textarea"
            v-model="form.explain"
            class="form-textarea"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="giveUp">放弃编辑</el-button>
        <el-button :disabled="sendEditing" type="primary" @click="submit">提交修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/request";

export default {
  data() {
    return {
      loadingInstance: {},
      sendEditing: false,

      alpha: ["A", "B", "C", "D"],
      activeIndex: "",
      types: [],
      questionsMap: new Map(),
      questions: [],

      dialogVisible: false,

      editing: -1,
      form: {
        answer: [],
        contnet: "",
        deleted: 0,
        explain: "",
        selections: [],
        type: 0,
        _id: "",
      },
    };
  },
  watch: {
    questionsMap(newValue) {
      // console.log(newValue);
      this.loadingInstance.close();
    },
  },
  methods: {
    async getAllQuestions() {
      let res = await request({
        url: "/teacher/getAllQuestions",
        method: "POST",
      });
      if (res.data.code == 200) {
        this.types = res.data.data.types;
        this.questionsMap = new Map(res.data.data.questions);
      } else {
        //
      }
    },
    handleSelect(index) {
      this.questions = this.questionsMap.get(parseInt(index));
      // console.log(this.questions[0]);
    },
    async deleteQuestion(question, i) {
      // console.log(question);

      this.questions.splice(i, 1);

      let res = await request({
        url: "/teacher/deleteQuestion",
        method: "POST",
        data: {
          id: question._id,
        },
      });
      if (res.data.code == 200) {
        this.$message({
          message: "移除成功",
          type: "success",
        });
      }
    },
    showDialog(question, i) {
      this.dialogVisible = true;
      this.editing = i;
      // console.log(question);
      this.form = {
        ...question,
        selections: [...question.selections],
        answer: [...question.answer],
      };
    },
    removeSelection(index) {
      if(this.form.selections.length <= 2) return this.$message({
        message: '至少有两个选项',
        type: 'warning'
      })
      this.form.selections.splice(index, 1);
      if (this.form.answer.indexOf(index) != -1) {
        this.form.answer.splice(this.form.answer.indexOf(index), 1);
      }
      this.form.answer.forEach((ele,i,arr) =>{
        if(ele > index){
          arr.splice(i,1,ele - 1)
        }
      })
    },
    handleClose(done) {
      this.$confirm("确认放弃编辑的内容吗？")
        .then((_) => {
          this.form = {selections:[]};
          this.editing = -1;
          done();
        })
        .catch((_) => {});
    },
    giveUp() {
      this.dialogVisible = false;
      this.form = {selections:[]};
      this.editing = -1;
    },
    async submit() {
      this.sendEditing = true;
      const res = await request({
        url: "/teacher/editQuestion",
        method: "post",
        data: {
          form: this.form,
        },
      });
      if (res.data.code == 200) {
        this.sendEditing = false;
        this.$message({
          message: "修改成功",
          type: "success",
        });
        //替换元数据
        // console.log(this.editing);
        // console.log(this.questions);
        // console.log(this.questions[this.editing]);
        this.questions.splice(this.editing, 1, this.form);
        this.dialogVisible = false;
        this.form = {selections:[]};
        this.editing = -1;
      } else {
        this.$message.error("修改失败");
      }
    },
  },
  mounted() {
    this.loadingInstance = this.$loading.service({
      target: ".view",
      body: true,
    });
    this.getAllQuestions();
  },
};
</script>

<style lang="less" scoped>
.el-dialog {
  margin-top: 0;
}
.main {
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  textarea {
    min-height: none !important;
  }
  .box-card {
    position: relative;
    margin: 0 auto;
    margin-top: 30px;
    width: 90%;
    .clearfix {
      &::before,
      &::after {
        display: table;
        content: "";
      }
      &::after {
        clear: both;
      }
    }
    .right-answer {
      background-color: #e8ffe8;
    }
    .text {
      font-size: 14px;
      line-height: 20px;
    }
    .item {
      margin-bottom: 14px;
    }
    .content {
      line-height: 24px;
      font-size: 16px;
      letter-spacing: 2px;
      font-weight: bold;
    }
    .explain {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #ebeef5;
      .item {
        margin-bottom: 10px;
      }
    }
  }
  .selections-form {
    display: flex;
    .label {
      width: 80px;
      height: 40px;
      text-align: right;
      vertical-align: middle;
      // float: left;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
    }
    .selections {
      width: calc(100% - 80px);
      .selection {
        margin-bottom: 22px;
        position: relative;
        .remove-selection {
          font-family: "iconfont" !important;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          &::after {
            content: "\e62a";
            color: #a8a8a8;
            font-size: 20px;
            position: absolute;
            right: 10px;
            top: 0;
            bottom: 0;
            margin: auto 0;
            display: block;
            height: 20px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>