<template>
  <div class="container">
    <div class="personalInfo">
      <el-descriptions class="margin-top" title="个人信息" :column="1">
        <template slot="extra">
          <el-button type="primary" size="small" plain>保存当前修改</el-button>
        </template>
      </el-descriptions>

      <el-form
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓 名" prop="name">
          <el-input
            v-model="info.name"
            placeholder="请输入内容"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="教师ID" prop="id">
          <el-input
            v-model="info.teacher_id"
            placeholder="请输入内容"
            size="mini"
            disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="性 别" prop="gender">
          <el-input
            v-model="info.gender"
            placeholder="请输入内容"
            size="mini"
            disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮 箱" prop="email">
          <el-input
            v-model="info.email"
            placeholder="请输入内容"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="pass">
          <el-input
            v-model="info.name"
            placeholder="请输入内容"
            size="mini"
            disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="所授班级" prop="class">
          <el-tag size="small">A1</el-tag>
        </el-form-item>
      </el-form>
    </div>

    <div class="personalCard">
      <div class="userId">
        <img
          class="user-portrait"
          alt=""
          src="https://cosplay.yangcong345.com/default_avatars/student_default_male.png"
        />

        <span>aa</span>
      </div>

      <div class="userNav">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-user-solid"
          class="userButton"
          plain
          >个人资料</el-button
        >
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-unlock"
          class="userButton"
          plain
          >密码修改</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      info: {},
    };
  },
  computed: {
    ...mapState(["teacherInfo"]),
  },
  mounted() {
    this.info = {
      ...this.teacherInfo,
    };
  },
};
</script>

<style >
.container {
  /* background-color: rgb(207, 51, 51); */
  cursor: pointer;
  font-size: 14px;
  box-sizing: border-box;
  border: 0;
  outline: 0;
  line-height: 1;
  margin: 25px;
  width: 90%;
  /* display: flex; */
  /* flex-direction:row-reverse; */
}
.container .personalInfo {
  font-size: 14px;
  box-sizing: border-box;
  border: 0;
  outline: 0;
  line-height: 1;
  margin: 0 0 0 40px;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px hsla(0, 0%, 39%, 0.1);
  float: left;
  width: 50%;
}

.container .personalCard {
  float: right;
  font-size: 14px;
  box-sizing: border-box;
  border: 0;
  outline: 0;
  line-height: 1;
  margin: 0;
  padding: 0;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 15px hsla(0, 0%, 39%, 0.1);
  width: 35%;
}

/* 卡片上半部分 */
.container .personalCard .userId {
  width: 100%;
  font-size: 14px;
  box-sizing: border-box;
  position: relative;
  display: flex;

  padding: 30px 0 0 20px;
}

/* 上半部分 的图片 */
.container .personalCard .userId .user-portrait {
  position: relative;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  vertical-align: middle;
  border: 0;
  margin: 0;
  padding: 0;
  height: 100px;
  width: 100px;
  border-radius: 50%;
}

/* 上半部分的信息 */
.container .personalCard .userId span {
  position: relative;
  top: 20px;
  left: 15px;
  display: block;
  height: 14px;
}

/* 卡片下半部分 */
.userNav {
  padding: 20px 0 0 20px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  margin: 0 0 30px 0;
}

.userButton {
  margin: 10px 0 5px 10px;
  width: 50%;
}

.form-input-div input {
  border-radius: 14px !important;
}
</style>