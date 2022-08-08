<template>
  <div class="main">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的班级" name="first" >
          <el-button type="primary" plain style="margin-left: 16px;">新建班级</el-button>
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
                <div class="style_right__Oo-vb">
                  <div class="style_name__TgRjJ">907203</div>
                  <div class="style_num__PzqFD">
                    <span>班内暂无学生</span>
                  </div>
                </div>
              </div>
              <div class="style_btm__xPuHV">
                <el-button type="primary" icon="el-icon-edit" round plain style="margin-top:20px">班级管理</el-button>
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
                <div class="style_right__Oo-vb">
                  <div class="style_name__TgRjJ">906675</div>
                  <div class="style_num__PzqFD">
                    <ul>
                      <li>班级编号：906675</li>
                      <li>老师：1</li>
                      <li>学生：4</li>
                      <li>家长：0</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="style_btm__xPuHV">
                <el-button type="primary" icon="el-icon-edit" round plain style="margin-top:20px">班级管理</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="班级学情" name="second">
        班级学情
        
        </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>
</style>


<script>
import { mapState } from "vuex";
export default {
  name:'Classes',
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
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
  height: 140px;
  margin-bottom: 5px;
  margin-top: 4px;
   margin-left: 10px;
  padding: 20px 24px;
  width: calc(43% - 12px);
  // background-color: rgb(168, 21, 21);
}

// 班级卡片 上半部分
.style_listBox__40SsE .style_item__BJ73k .style_top__09yUH {
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  display: flex;
  height: 80px;
  width: 100%;
  // background-color: rgb(168, 21, 21);
}

// 班级卡片  头像
.style_listBox__40SsE .style_item__BJ73k .style_top__09yUH .style_left__l5taP {
  height: 54px;
  margin-right: 16px;
  width: 54px;
  // background-color: rgb(168, 21, 21);
}
.style_classListLeft__MZMoX .style_listBox__40SsE .style_item__BJ73k .style_btm__xPuHV {
    align-items: center;
    color: #356cfe;
    display: flex;
    font-size: 18px;
    font-weight: 400;
    line-height: 25px;
    // margin-top: 20px;
}
</style>