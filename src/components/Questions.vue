<template>
  <div class="wrapper">
    <el-tabs v-model="activeName" class="head" @tab-click="handleClick">
      <el-tab-pane
        :key="type.type"
        v-for="(type, index) in types"
        :label="type.name"
        :name="index.toString()"
      ></el-tab-pane>
    </el-tabs>
    <div class="main">
      <el-button
        v-show="questions.length > 0"
        @click="
          showDialog(
            {
              contnet: '',
              selections: [],
              answer: [],
              explain: '',
            },
            -1
          )
        "
        >添加题目</el-button
      >

      <el-card
        class="box-card"
        v-for="(question, i) in questions"
        :key="question._id"
      >
        <div slot="header" class="clearfix">
          <!-- <span>卡片名称</span> -->
          <div class="class-type">{{ question.ty }}</div>
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
          {{ alpha[index] }}. {{ selection }}
        </div>
        <div class="explain">
          <div class="text item">题目解析:</div>
          <div class="text">
            {{ question.explain ? question.explain : "无" }}
          </div>
        </div>
      </el-card>

      <el-collapse v-model="collapseIndex" accordion>
        <el-collapse-item title="科普" name="1">
          <div>
            与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
          </div>
          <div>
            在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
          </div>
        </el-collapse-item>
        <el-collapse-item title="普通诈骗" name="2">
          <div>
            控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
          </div>
          <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
        </el-collapse-item>
        <el-collapse-item title="问答" name="3">
          <div>简化流程：设计简洁直观的操作流程；</div>
          <div>
            清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
          </div>
          <div>
            帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-dialog
      :title="adding ? '添加题目' : '编辑题目'"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="题目类型">
          <el-select v-model="form.ty" placeholder="请选择题目类型">
            <el-option label="科普" value="科普"></el-option>
            <el-option label="普通诈骗" value="普通诈骗"></el-option>
            <el-option label="问答" value="问答"></el-option>
          </el-select>
        </el-form-item>
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
              <div class="remove-selection" @click="removeSelection(index)">
                <i class="el-icon-remove-outline"></i>
              </div>
            </div>

            <div v-if="inputVisible" class="selection">
              <el-input
                class="input-new-tag add-selection"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
                style="width: 100%"
              >
              </el-input>
              <!-- <div class="remove-selection">
                <i class="el-icon-remove-outline" @click="inputValue = ''"></i>
              </div> -->
            </div>
            <el-button
              v-else
              class="button-new-tag selection add-selection"
              size="small"
              @click="showInput"
            >
              添加选项
              <i class="el-icon-circle-plus-outline"></i>
            </el-button>
            <!-- <div class="selection add-selection">
              <i class="el-icon-circle-plus-outline"></i>
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
        <el-button
          :disabled="sendEditing"
          type="primary"
          @click="adding ? submitAddition() : submit()"
          >{{ adding ? "添加题目" : "提交修改" }}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/request";

export default {
  data() {
    return {
      type: -1,

      loadingInstance: {},
      sendEditing: false,

      alpha: ["A", "B", "C", "D"],
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

      inputVisible: false,
      inputValue: "",

      adding: false,

      activeName: "-1",

      collapseIndex: "-1",
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
    handleClick() {
      let index = this.activeName;
      this.questions = this.questionsMap.get(parseInt(index));
      this.type = parseInt(index);
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
      if (i == -1) this.adding = true;
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
      if (this.form.selections.length <= 2)
        return this.$message({
          message: "至少有两个选项",
          type: "warning",
        });
      this.form.selections.splice(index, 1);
      if (this.form.answer.indexOf(index) != -1) {
        this.form.answer.splice(this.form.answer.indexOf(index), 1);
      }
      this.form.answer.forEach((ele, i, arr) => {
        if (ele > index) {
          arr.splice(i, 1, ele - 1);
        }
      });
    },
    handleClose(done) {
      this.$confirm("确认放弃编辑的内容吗？")
        .then((_) => {
          this.form = { selections: [] };
          this.editing = -1;
          this.adding = false;
          done();
        })
        .catch((_) => {});
    },
    giveUp() {
      this.dialogVisible = false;
      this.form = { selections: [] };
      this.editing = -1;
      this.adding = false;
    },
    async submit() {
      if (!this.form.ty)
        return this.$message({
          type: "warning",
          message: "请选择题目类型",
        });
      if (!this.form.contnet.trim())
        return this.$message({
          type: "warning",
          message: "请填写题目内容",
        });
      if (this.form.answer.length == 0)
        return this.$message({
          type: "warning",
          message: "请选择答案",
        });

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
        this.form = { selections: [] };
        this.editing = -1;
        this.adding = false;
      } else {
        this.$message.error("修改失败");
      }
    },
    async submitAddition() {
      if (!this.form.ty)
        return this.$message({
          type: "warning",
          message: "请选择题目类型",
        });
      if (!this.form.contnet.trim())
        return this.$message({
          type: "warning",
          message: "请填写题目内容",
        });
      if (this.form.selections.length < 2)
        return this.$message({
          type: "warning",
          message: "请添加选项",
        });
      if (this.form.answer.length == 0)
        return this.$message({
          type: "warning",
          message: "请选择答案",
        });

      this.sendEditing = true;
      //request
      const res = await request({
        url: "/teacher/addQuestion",
        method: "post",
        data: {
          form: {
            ...this.form,
            type: this.type,
          },
        },
      });
      if (res.data.code == 200) {
        this.sendEditing = false;
        this.$message({
          message: "添加成功",
          type: "success",
        });
        // this.questions.splice(this.editing, 1, this.form);
        this.questions.unshift(res.data.data.doc);

        this.dialogVisible = false;
        this.form = { selections: [] };
        this.editing = -1;
        this.adding = false;
      } else {
        this.$message.error("添加失败");
      }
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue.trim()) {
        this.form.selections.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
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
.wrapper {
  // position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 20px;
  padding-top: 0;
  // padding-right: 0;
  box-sizing: border-box;

  .head {
    position: absolute;
    width: calc(100% - 40px);
    z-index: 5;
    background-color: #fff;
    padding-top: 20px;
  }
  .main {
    width: 100%;
    // min-height: 100%;
    height: auto;
    background-color: #fff;
    padding: 0;
    box-sizing: border-box;
    position: relative;
    z-index: 0;
    top: 74px;
    padding-bottom: 20px;
    .el-collapse-item{
      .el-collapse-item__header{
        font-size: 15px;
      }
    }
    .box-card {
      position: relative;
      margin: 0 auto;
      margin-top: 30px;
      width: 90%;
      .clearfix {
        .class-type {
          display: inline-block;
          font-size: 18px;
          font-weight: bolder;
          text-align: left;
          vertical-align: sub;
        }
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
  }
  textarea {
    min-height: none !important;
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
      position: relative;
      .selection {
        margin-bottom: 22px;
        position: relative;
        i {
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
      .add-selection {
        height: 40px;
        width: 115px;
        text-align: left;
        font-size: 14px;
      }
    }
  }
}
</style>