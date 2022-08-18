<template>
  <div class="main">
    <el-tabs v-model="activeName">
      <el-tab-pane label="我的班级" name="0"></el-tab-pane>
      <!-- {{classInfo}} -->
    </el-tabs>
    <div class="style_classListBox__NBMYd">
      <div class="style_listBox__40SsE" v-loading="bodyLoading">
        <div
          class="style_item__BJ73k"
          v-for="info in classInfo"
          :key="info.name"
        >
          <div class="style_top__09yUH">
            <div class="style_left__l5taP">
              <img
                src="https://fps.yangcongxueyuan.com/static/media/class0.304ad61c98fff5d19f50.png"
                width="100%"
                alt=""
              />
            </div>
            <div class="classIfo">
              <ul>
                <li>班级：{{ info.name }}</li>
                <li>数量：{{ info.count }}</li>
              </ul>
            </div>
          </div>
          <div class="buttonContainer">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              class="buttons"
              round
              plain
              style="margin-top: 5px"
              @click="toClass(info)"
              >班级学情</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              plain
              class="buttons"
              round
              style="margin-top: 5px"
              @click="deleteClass(info)"
              >删除班级</el-button
            >
          </div>
        </div>
        <!-- 
        <div class="style_item__BJ73k">
          <div class="style_top__09yUH">
            <div class="style_left__l5taP">
              <img
                src="https://fps.yangcongxueyuan.com/static/media/class1.6ab38f5420877c66d50b.png"
                width="100%"
                alt=""
              />
            </div>
            <div class="classIfo">
              <ul>
                <li>班级：三年级5班</li>
                <li>数量：0</li>
              </ul>
            </div>
          </div>
          <div class="buttonContainer">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              class="buttons"
              round
              plain
              style="margin-top: 5px"
              >班级学情</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              plain
              class="buttons"
              round
              style="margin-top: 5px"
              >删除班级</el-button
            >
          </div>
        </div> -->

        <div class="addClass">
          <!-- <img src="../assets/UI/person/24gl-userGroupPlus.png" /> -->
          <img
            src="../assets/UI/person/addc.png"
            @click="function () {
                dialogFormVisible = true;
                getClass();
              }
            "
          />
          <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
          <el-dialog title="添加班级" :visible.sync="dialogFormVisible">
            <el-form :model="form" v-loading="loading">
              <el-form-item label="班级" :label-width="formLabelWidth">
                <el-select v-model="form.choosenClass" placeholder="请选择班级">
                  <el-option
                    v-for="c in classes"
                    :key="c.class"
                    :label="c.class"
                    :value="c.class"
                    :disabled="Boolean(c.teacher_id)"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button
                type="primary"
                @click="commitChoose"
                :disabled="loading"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>


<script>
import { request } from "@/request/index.js";
import { mapActions, mapState } from "vuex";
export default {
  name: "Classes",
  data() {
    return {
      activeName: "0",

      loading: false,
      bodyLoading: false,

      activeIndex: "1",
      activeIndex2: "1",
      dialogTableVisible: false,
      dialogFormVisible: false,

      form: {
        choosenClass: "",
      },
      formLabelWidth: "120px",

      classes: [],
    };
  },
  methods: {
    async commitChoose() {
      if (!this.form.choosenClass) {
        return this.$message({
          message: "请选择需要添加的班级",
          type: "warning",
        });
      }
      this.loading = true;
      //请求 添加班级
      let res = await request({
        url: "/teacher/selectStudent",
        method: "POST",
        data: {
          theClass: this.form.choosenClass,
        },
      });
      console.log(res);
      if (res.data.code == 200) {
        this.form.choosenClass = "";
        if ((await this.getAllClass()) == 1) {
          this.dialogFormVisible = false;
          this.loading = false;
          this.$message({
            message: "添加成功",
            type: "success",
          });
        }
      }
    },
    toClass(info) {
      console.log(info);
      this.$router.push({
        name: "class",
        params: {
          theClass: info.name,
        },
      });
    },
    async getClass() {
      this.loading = true;
      const res = await request({
        url: "/teacher/getClasses",
        method: "POST",
      });
      if (res.data.code == 200) {
        this.classes = res.data.data;
        this.loading = false;
      }
    },
    async deleteClass({ name }) {
      this.bodyLoading = true;
      const res = await request({
        url: "/teacher/deleteClass",
        method: "POST",
        data: {
          theClass: name,
        },
      });
      if (res.data.code == 200) {
        if (await this.getAllClass() == 1) {
          this.bodyLoading = false;
          this.$message({
            message: "删除成功",
            type: "success",
          });
        }
      }
    },
    ...mapActions(["getAllClass"]),
  },
  computed: {
    ...mapState(["classMap"]),
    classInfo() {
      const arr = [];
      const iterator = this.classMap.keys();
      for (let i = iterator.next(); !i.done; i = iterator.next()) {
        arr.push({
          name: i.value,
          count: this.classMap.get(i.value).length,
        });
      }

      return arr;
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
}

// 班级卡片整体
.style_classListBox__NBMYd {
  // background: #f5f5f5;
  flex-direction: row;
  // height: 100vh;
  left: 0;
  padding-top: 10px;

  // position: fixed;
  top: 0;
  width: 100%;
}
.style_listBox__40SsE {
  position: relative;
  margin: 0 auto;
  // height: 100%;
  overflow: auto;
  // width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // justify-content: space-between;
  padding: 10px 0;
}

// 班级卡片 一整张
.style_listBox__40SsE .style_item__BJ73k {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 5px 10px 0 rgb(50 50 93 / 35%);
  display: flex;
  flex-direction: column;
  float: left;
  height: 140px;
  margin: 10px 1%;
  padding: 12px;
  box-sizing: border-box;
  width: calc(31% - 0px);
}

// 班级卡片 上半部分
.style_listBox__40SsE .style_item__BJ73k .style_top__09yUH {
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  display: flex;
  height: 70px;
  width: 100%;
  font-size: 8px;
  // background-color: rgb(168, 21, 21);
}
.buttonContainer {
  margin: auto 0;
  width: 100%;
  display: flex;
  // justify-content: space-between;
}
.buttons {
  float: left;
  min-width: 20px;
  max-width: 200px;
  display: block;
  margin: auto 0;
  margin-left: 8px !important;
  position: relative;
}

// 班级卡片 班级信息列表
.classIfo ul li {
  font-size: 12px;
  font-weight: 400;
  line-height: 25px;
  //color:#356cfe
  color: #627096;
}

// 班级卡片  头像
.style_listBox__40SsE .style_item__BJ73k .style_top__09yUH .style_left__l5taP {
  height: 54px;
  margin-right: 16px;
  width: 54px;
  // background-color: rgb(168, 21, 21);
}

.addClass {
  position: relative;
  height: 140px;
  margin: 10px 1%;
  padding: 12px;
  box-sizing: border-box;
  width: calc(31% - 0px);
  // border: #000 solid 1px;
  // margin: 10px 0 0 80px;
  overflow: hidden;
}
.addClass img {
  // margin-top: 30px;
  // margin-left: 10px;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 65px;
  height: 65px;
  cursor: pointer;
  transition: all 0.6s;
}
.addClass img:hover {
  transform: scale(1.25);
}
</style>