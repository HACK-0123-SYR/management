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
      :title="adding ? '添加题目' : '编辑题目'"
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
      type:-1,

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

      inputVisible: false,
      inputValue: "",

      adding: false,
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
      this.type = parseInt(index)
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
            type:this.type,
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
        this.questions.unshift(res.data.data.doc)
        
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