<template>
  <div class="main">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的班级" name="first">
        <div class="style_classListBox__NBMYd">
          <div class="style_listBox__40SsE">
            <div class="style_item__BJ73k">
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
            </div>
            <div class="style_item__BJ73k">
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
            </div>

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
            </div>

            <div class="addClass">
              <!-- <img src="../assets/UI/person/24gl-userGroupPlus.png" /> -->
              <img src="../assets/UI/person/addc.png" @click="dialogFormVisible = true"/>
              <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
              <el-dialog title="添加班级" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                   <el-form-item label="年级" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="请选择年级"
                    >
                      <el-option label="一年级" value=""></el-option>
                      <el-option label="二年级" value=""></el-option>
                       <el-option label="三年级" value=""></el-option>
                      <el-option label="四年级" value=""></el-option>
                       <el-option label="五年级" value="5"></el-option>
                      <el-option label="六年级" value="6"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="班级" :label-width="formLabelWidth">
                    <el-select
                      v-model="form.region"
                      placeholder="请选择班级"
                    >
                      <el-option label="1班" value="c1"></el-option>
                      <el-option label="2班" value="c2"></el-option>
                      <el-option label="3班" value="c3"></el-option>
                      <el-option label="4班" value="c4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="dialogFormVisible = false"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>
</style>


<script>
import { mapState } from "vuex";
export default {
  name: "Classes",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {
    ...mapState(["classMap"]),
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  padding: 20px;
}

// 班级卡片整体
.style_classListBox__NBMYd {
  // background: #f5f5f5;
  flex-direction: row;
  height: 100vh;
  left: 0;
  padding-top: 10px;

  // position: fixed;
  top: 0;
  width: 100%;
}
.style_listBox__40SsE {
  height: 100%;
  overflow: scroll;
  width: 100%;
}

// 班级卡片 一整张
.style_listBox__40SsE .style_item__BJ73k {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 5px 10px 0 rgb(50 50 93 / 35%);
  display: flex;
  flex-direction: column;

  float: left;
  height: 120px;
  margin-bottom: 5px;
  margin-top: 4px;
  margin-left: 10px;
  padding: 12px 8px;
  width: calc(30% -5px);
  // background-color: rgb(168, 21, 21);
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
}
.buttons {
  float: left;
  min-width: 20px;
  max-width: 200px;
  display: block;
  margin: auto 0.1em;
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
  width: 150px;
  height: 150px;
  // border: #000 solid 1px;
  margin: 10px 0 0 80px;
  overflow: hidden;
}
.addClass img {
  margin-top: 30px;
  margin-left: 10px;
  width: 65px;
  height: 65px;
  cursor: pointer;
  transition: all 0.6s;
}
.addClass img:hover {
  transform: scale(1.25);
}
</style>