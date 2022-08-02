<template>
  <div class="login-container">
    <el-form ref="formRef" :model="form" class="login-form" :rules="rules">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item>
        <el-icon :size="20" class="svg-container"></el-icon>
          <edit />
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-icon :size="20" class="svg-container"></el-icon>
          <edit />
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-button" >登录</el-button>
    </el-form>
  </div>
</template>


<script>
  // import { ref } from 'vue'
  // import { login } from '../request/index.js'
  // import { useStore } from 'vuex'
    
</script>

<style>
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
}
.login-container .login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 160px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}
.login-container .login-form ::v-deep .el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
}
.login-container .login-form ::v-deep .el-input {
  display: inline-block;
  height: 47px;
  width: 85%;
}
.login-container .login-form ::v-deep .el-input input {
  background: transparent;
  border: 0px;
  -webkit-appearance: none;
  border-radius: 0px;
  padding: 12px 5px 12px 15px;
  color: #eee;
  height: 47px;
  caret-color: #fff;
}
.login-container .login-form .login-button {
  width: 100%;
  box-sizing: border-box;
}
.login-container .tips {
  font-size: 16px;
  line-height: 28px;
  color: #fff;
  margin-bottom: 10px;
}
.login-container .tips span:first-of-type {
  margin-right: 16px;
}
.login-container .svg-container {
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  vertical-align: middle;
  display: inline-block;
}
.login-container .title-container {
  position: relative;
}
.login-container .title-container .title {
  font-size: 26px;
  color: #eee;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}
.login-container .title-container ::v-deep .lang-select {
  position: absolute;
  top: 4px;
  right: 0;
  background-color: white;
  font-size: 22px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
}
.login-container .show-pwd {
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
</style>