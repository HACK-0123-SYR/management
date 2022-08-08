<template>
  <div class="main">
    <div class="back-banner">
      <i class="iconfont icon-xiangzuo1" @click="back"></i>
    </div>
    <div class="banner">
      <!-- <div class="icon">
        <img :src="studentInfo._doc.portrait" />
      </div> -->
      <div class="info">
        <div class="name">姓名：{{studentInfo?._doc?.name}}</div>
        <div class="num">班级：{{studentInfo?._doc?.class}}</div>
      </div>
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
                style="stroke: #3fb0decc"
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
                style="stroke: #6de5c3cc"
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
    <div class="feedback">
      <div class="title">FEEDBACK</div>
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
      progress: 0,
      rate: 0,
      studentInfo: {},
    };
  },
  props: ["id"],
  computed: {
    // ...mapState(["theme"]),
    // ...mapState(["oneStudentInfo", "oneStudentWeekStatus", "theme"]),
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
  },
  watch: {
    studentInfo: {
      handler(newValue) {
        console.log(newValue);
        this.$nextTick(() => {
          const chart1 = this.$echarts.init(this.$refs.chart1, "theme");
          const chart3 = this.$echarts.init(this.$refs.chart3, "theme");
          const chart2 = this.$echarts.init(this.$refs.chart2, "theme");

          chart1.setOption({
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
              // text: "Basic Radar Chart",
            },
            legend: {
              data: ["Allocated Budget", "Actual Spending"],
            },
            radar: {
              // shape: 'circle',
              indicator: [
                { name: "Sales", max: 1 },
                { name: "Administration", max: 1 },
                { name: "Information Technology", max: 1 },
                { name: "Customer Support", max: 1 },
                { name: "Development", max: 1 },
                { name: "Ser", max: 1 },
              ],
            },
            series: [
              {
                name: "Budget vs spending",
                type: "radar",
                data: [
                  {
                    value: [0.52, 0.8, 0.36, 0.23, 0.65, 0.63],
                    name: "Allocated Budget",
                  },
                  {
                    value: [0.34, 0.65, 0.98, 0.5, 0.4, 0.52],
                    name: "Actual Spending",
                  },
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
              data: [
                "Search Engine",
              ],
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
      },
      immediate: false,
    },
  },
  methods: {
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
      this.progress = 45
      this.rate = 95
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

    this.getStuInfo(this.id);
  },
  beforeDestroy() {
    // this.DestoryInfo()
  },
};
</script>

<style lang="less" scoped>
.main {
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
  }
  .back-banner {
    height: 15px;
    width: 100%;
    margin-top: 0;
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
    .info {
      display: flex;
      align-items: baseline;
      color: #4f4c4c;
      .name {
        margin-left:20px;
        margin-right: 15px;
        display: inline-block;
        font-size: 18px;
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
    .process {
      position: relative;
      height: 48%;
      width: 100%;
      background-color: rgb(234, 255, 254);
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
          color: #8c8c8e;
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
            transition: stroke-dashoffset 1s ease;
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
    width: 100%;
    height: 320px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0px 0px 10px 2px rgb(223, 223, 223);
    .title {
      height: 70px;
      width: 100%;
      background-color: rgb(252, 252, 240);
      line-height: 70px;
      padding: 0 20px;
      font-weight: bolder;
      font-size: larger;
    }
  }
  .barChart {
    height: 400px;
    width: 50%;
    background-color: rgb(243, 249, 255);
    border-radius: 10px;
    position: relative;
    // margin:0 auto;
  }
  .radarChart {
    height: 600px;
    width: 100%;
    border-radius: 10px;
    background-color: aliceblue;
    padding: 30px;
    box-sizing: border-box;
  }
  .lineChart {
    height: 400px;
    width: 100%;
    background-color: rgb(225, 254, 245);
    border-radius: 20px;
  }
}
</style>