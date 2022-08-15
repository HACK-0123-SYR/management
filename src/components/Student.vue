<template>
  <div class="main">
    <div class="back-banner">
      <i class="iconfont icon-xiangzuo1" @click="back"></i>
    </div>
    <div class="banner">
      <div class="info">
        <div class="name">姓名：{{ studentInfo?._doc?.name }}</div>
        <div class="num">学号：{{ studentInfo?._doc?.student_id }}</div>
      </div>
      <!-- <div class="line" style="width:100%"></div> -->
    </div>
    <div class="datas">
      <div class="process">
        <div class="con"><span>学习进度</span></div>
        <div class="cir">
          <div class="load-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 46 46"
              class="base"
            >
              <circle class="a" cx="23" cy="23" r="20" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 46 46"
              class="loader"
              :style="{
                strokeDashoffset: `calc(-2 * 3.1416 * 20 * (1 - ${
                  progress / 100
                }))`,
              }"
            >
              <circle
                class="a"
                cx="23"
                cy="23"
                r="20"
                style="stroke: #c6cfff"
              />
            </svg>
          </div>
          <div class="moji">{{ progress }}%</div>
        </div>
      </div>
      <div class="process">
        <div class="con"><span>正确率</span></div>
        <div class="cir">
          <div class="load-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 46 46"
              class="base"
            >
              <circle class="a" cx="23" cy="23" r="20" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 46 46"
              class="loader"
              :style="{
                strokeDashoffset: `calc(-2 * 3.1416 * 20 * (1 - ${
                  rate / 100
                }))`,
              }"
            >
              <circle
                class="a"
                cx="23"
                cy="23"
                r="20"
                style="stroke: #e8d3ff"
              />
            </svg>
          </div>
          <div class="moji">{{ rate }}%</div>
        </div>
      </div>
    </div>

    <div class="barChart" ref="chart1"></div>

    <div class="radarChart" ref="chart2"></div>

    <div class="lineChart" ref="chart3"></div>
    <div class="feedback" v-loading="sending">
      <div class="title">
        FEEDBACK

        <el-popover placement="top" title="反馈" width="250" trigger="hover">
          <p class="p">点击添加类型来指定需要加强类型</p>
          <p class="p">在输入框中填写给学生的反馈信息</p>
          <p class="p">点击提交反馈以提交信息</p>
          <i class="iconfont icon-wenhao" slot="reference"></i>
        </el-popover>
      </div>
      <div class="tags">
        <span class="strengthen">加强类型：</span>
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          color="#fdfaff"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-dropdown trigger="click" @command="handleSelect">
          <el-button class="button-new-tag" size="small"
            >添加类型<i class="el-icon-arrow-down el-icon--right"></i
          ></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="type in types"
              :key="type.type"
              :command="type"
              :disabled="commitTypes.indexOf(type.type) != -1"
            >
              {{ type.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="content" :class="{ reject: reject }">
        <el-input type="textarea" v-model="msg" class="input"></el-input>
      </div>
      <div class="button-container">
        <el-button
          type="primary"
          plain
          round
          @click="feedBack"
          :disabled="sending"
          >提交反馈</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
//request
import { request } from "@/request/index.js";

export default {
  data() {
    return {
      loadingInstance: {},

      progress: 0,
      types: [],
      studentInfo: {},
      dynamicTags: [],

      reject: false,
      sending: false,
      //需要提交
      msg: "",
      commitTypes: [],
    };
  },
  props: ["id"],
  computed: {
    // ...mapState(["theme"]),
    // ...mapState(["oneStudentInfo", "oneStudentWeekStatus", "theme"]),
    //rate
    rate() {
      if (!this.studentInfo.typeStatus) return 0;
      let t = 0;
      let f = 0;
      this.studentInfo.typeStatus.forEach(({ errCount, resCount }) => {
        t += resCount
        f += errCount
      });
      if(isNaN(t * 100 / (t + f))) return 0
      return Math.ceil(t * 100 / (t + f));
    },
    //bar
    resCount() {
      let res = [];
      this.studentInfo.weekStatus.forEach((ele) => {
        res.push(ele.resCount);
      });
      return res;
    },
    errCount() {
      let res = [];
      this.studentInfo.weekStatus.forEach((ele) => {
        res.push(-ele.errCount);
      });
      return res;
    },
    grade() {
      let res = [];
      this.studentInfo.weekStatus.forEach((ele) => {
        res.push(ele.grade);
      });
      return res;
    },
    //radar
    indicator() {
      const arr = [];
      this.types.forEach((ele) => {
        arr.push({
          name: ele.name,
          max: 1,
        });
      });
      return arr;
    },
    radarRates() {
      const arr = [];
      this.studentInfo.typeStatus.forEach(({ errCount, resCount }) => {
        arr.push(resCount / (resCount + errCount));
      });
      return arr;
    },
  },
  watch: {
    studentInfo: {
      async handler(newValue) {
        // console.log(newValue);
        this.loadingInstance.close();
        setTimeout(() => {
          this.$nextTick(() => {
            const chart1 = this.$echarts.init(this.$refs.chart1, "theme");
            const chart3 = this.$echarts.init(this.$refs.chart3, "theme");
            const chart2 = this.$echarts.init(this.$refs.chart2, "theme");

            chart1.setOption({
              title: {
                text: "  做题情况",
              },
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "shadow",
                },
              },
              legend: {
                data: ["Expenses", "Income"],
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
              },
              yAxis: [
                {
                  type: "value",
                },
              ],
              xAxis: [
                {
                  type: "category",
                  axisTick: {
                    show: false,
                  },
                  data: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                },
              ],
              series: [
                {
                  name: "Income",
                  type: "bar",
                  stack: "Total",
                  label: {
                    show: true,
                  },
                  emphasis: {
                    focus: "series",
                  },
                  data: this.resCount,
                  barWidth: "45%",
                  itemStyle: {},
                },
                {
                  name: "Expenses",
                  type: "bar",
                  stack: "Total",
                  label: {
                    show: true,
                    position: "left",
                  },
                  emphasis: {
                    focus: "series",
                  },
                  data: this.errCount,
                  itemStyle: {},
                },
              ],
            });
            chart2.setOption({
              title: {
                text: "",
              },
              legend: {
                data: ["各类型正确率"],
              },
              radar: {
                // shape: 'circle',
                indicator: this.indicator,
              },
              series: [
                {
                  // name: "Budget vs spending",
                  type: "radar",
                  data: [
                    {
                      value: this.radarRates,
                      name: "各类型正确率",
                    },
                    // {
                    //   value: [0.34, 0.65, 0.98, 0.5, 0.4, 0.52],
                    //   name: "Actual Spending",
                    // },
                  ],
                },
              ],
            });
            chart3.setOption({
              title: {
                text: "Stacked Line",
              },
              tooltip: {
                trigger: "axis",
              },
              legend: {
                data: ["Search Engine"],
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
              },
              toolbox: {
                feature: {
                  saveAsImage: {},
                },
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: ["Sun", "Tue", "Wed", "Thu", "Fri", "Sat", "Mon"],
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  name: "Search Engine",
                  type: "line",
                  smooth: true,
                  stack: "Total",
                  data: this.grade,
                },
              ],
            });
          });
        }, 500);
      },
      immediate: false,
    },
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      let { type } = this.types.find((ele) => {
        return ele.name == tag;
      });
      this.commitTypes.splice(this.commitTypes.indexOf(type), 1);
      // console.log("commitTypes:", this.commitTypes);
    },
    handleSelect(type) {
      this.dynamicTags.push(type.name);
      this.commitTypes.push(type.type);
    },
    back() {
      this.$router.back();
    },
    async getStuInfo(id) {
      let res = await request({
        url: "/teacher/getWeekStatus",
        method: "POST",
        data: {
          id,
        },
      });
      this.studentInfo = res.data.data;
      this.types = res.data.data.types;
      //
      this.progress = 45;
    },
    async feedBack() {
      this.sending = true;
      //检验表单
      if (!this.msg.trim()) {
        this.reject = true;
        this.sending = false;
        return;
      }
      this.reject = false;
      //请求
      let res = await request({
        url: "/teacher/feedBack",
        method: "POST",
        data: {
          id: this.studentInfo?._doc?.student_id,
          commitTypes: this.commitTypes,
          msg: this.msg,
        },
      });
      console.log(res);
      //处理feedback回调
      if (res.data.code == 200) {
        //success
        this.msg = "";
        this.sending = false;
        this.commitTypes = [];
        this.dynamicTags = [];
        this.$message({
          message: "反馈成功",
          type: "success",
        });
      } else {
        //
      }
    },
    // ...mapMutations(["DestoryInfo"]),
  },
  mounted() {
    // console.log(this.$bus);
    // if (!this.oneStudentInfo._id) {
    //   this.$router.replace({
    //     name: "studentList",
    //   });
    // }
    // echarts.registerTheme("theme", this.theme);
    console.log("mounted", this.id);
    // console.log(document.querySelector(''));
    this.loadingInstance = this.$loading.service({
      target: ".view",
      body: true,
    });

    this.getStuInfo(this.id);
  },
  beforeDestroy() {
    // this.DestoryInfo()
  },
};
</script>

<style lang="less" scoped>
.main {
  position: relative;
  min-height: 100%;
  width: 100%;
  //   background-color: aqua;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & > div {
    margin-top: 30px;
    box-shadow: 0 5px 10px 0 rgb(50 50 93 / 35%);
  }
  .back-banner {
    height: 15px;
    width: 100%;
    margin-top: 0;
    box-shadow: none;
    i {
      cursor: pointer;
    }
  }
  .banner {
    position: relative;
    // top: -40px;
    // left: 15px;
    height: 40px;
    width: 100%;
    // background-color: #f1f1f1;
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // padding-left: 30px;
    // box-shadow: 0 0 10px 1px rgba(158, 158, 158, 0.482);
    // border-bottom: 1px solid #a1a1a1;
    .info {
      display: flex;
      align-items: baseline;
      color: #4f4c4c;
      height: 100%;
      div {
        height: 100%;
        line-height: 40px;
      }
      .name {
        margin-left: 20px;
        margin-right: 15px;
        display: inline-block;
        font-size: 18px;

        // margin-left: 20px;
        // margin-right: 15px;
        // display: inline-block;
        // font-size: 18px;
        // background-color: #cfe8fc;
        // padding: 5px 10px;
        // box-sizing: content-box;
        // border-radius: 10px;
        // color: #8c8c8e;
      }
      .num {
        display: inline-block;
        font-size: 14px;
      }
    }
    .icon {
      height: 60px;
      width: 60px;
      // background-color: #f7c5ff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 15px 2px rgb(158, 158, 158);
      img {
        display: 100%;
        height: 100%;
        width: 100%;
        border-radius: 10px;
      }
    }
  }

  .datas {
    width: 45%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    box-shadow: none;
    .process {
      position: relative;
      height: 48%;
      width: 100%;
      // background-color: rgba(225, 254, 245, 1);
      box-shadow: 0 5px 10px 0 rgb(50 50 93 / 35%);
      border-radius: 10px;
      display: flex;
      .con {
        height: 100%;
        flex: 4;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          font-size: 25px;
          color: #666666;
          font-weight: bold;
        }
      }
      .cir {
        height: 100%;
        flex: 5;
        position: relative;
        .moji {
          height: 60px;
          // width: 45px;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          text-align: center;
          line-height: 60px;
          font-size: 40px;
        }
        .load-box {
          height: 200px;
          max-width: 170px;
          transition: 0.8s ease;
          position: absolute;
          z-index: 5;
          right: 0;
          top: -0;
          left: 0;
          bottom: 0;
          margin: auto;
          svg {
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto 0;
            overflow: hidden;
            backface-visibility: hidden;
            circle {
              overflow: hidden;
              transition: all 0.2s ease;
              fill: none;
              // stroke: #43bcc7b5;
              stroke-miterlimit: 10;
              stroke-width: 2px;
              backface-visibility: hidden;
              transition: stroke 1.1s ease;
            }
          }
          .base {
            opacity: 0.5;
            circle {
              stroke: #eeeef0bc;
            }
          }
          .loader {
            opacity: 1;
            stroke-dasharray: calc(2 * 3.1416 * 20);
            transform: rotateZ(-90deg) rotateX(180deg);
            animation-fill-mode: both;
            transition: stroke-dashoffset 1s ease 0.5s;
            circle {
              stroke: #f7c5ff;
              // stroke-width: 3px;
            }
          }
        }
        animation: enter 1s ease forwards;
      }
    }
  }

  .feedback {
    position: relative;
    width: 100%;
    // height: vh;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0px 0px 10px 2px rgb(223, 223, 223);
    .title {
      height: 70px;
      width: 100%;
      //background-color: rgb(252, 252, 240);
      border-bottom: 1px solid #f0f0f0;
      line-height: 70px;
      padding: 0 20px;
      font-weight: bolder;
      font-size: larger;
      i {
        cursor: pointer;
        &::before {
          color: #b6b7e9;
        }
      }
    }
    .tags {
      padding: 10px 5px;
      padding-left: 18px;
      // border-bottom: 1px solid rgb(207, 207, 207);
      // border-bottom: 1px solid rgb(207, 207, 207);
      .strengthen {
        font-weight: bold;
        font-size: 15px;
        color: #666666;
      }
      .el-tag {
        margin: 0 5px;
      }
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
      }
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
    .content {
      // height: 35vh;
      width: 100%;
      position: relative;
      // background-color: #f7c5ff;
      display: flex;
      padding: 10px 20px;
      box-sizing: border-box;
      .select {
        height: 100%;
        width: 32%;
        display: flex;
        flex-direction: column;
      }
      .input {
        height: 100%;
        position: relative;
        // background-color: #f7c5ff;
      }
    }
    .button-container {
      margin: 0 auto 0px;
      padding: 10px 0px;
      box-sizing: content-box;
      height: 40px;
      width: calc(100% - 0px);
      //border-top: 1px solid #dcdfe6;
      text-align: center;
    }
  }
  .barChart {
    height: 400px;
    width: 50%;
    // background-color: rgb(243, 249, 255);
    border-radius: 10px;
    position: relative;
    // margin:0 auto;
  }
  .radarChart {
    height: 600px;
    width: 100%;
    border-radius: 10px;
    // background-color: aliceblue;
    padding: 30px;
    box-sizing: border-box;
  }
  .lineChart {
    height: 400px;
    width: 100%;
    // background-color: rgba(225, 254, 245, 0.4);
    border-radius: 20px;
  }
}
</style>