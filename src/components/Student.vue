<template>
  <div class="main">
    <div class="back-banner">
      <i class="iconfont icon-xiangzuo1" @click="back"></i>
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
                style="stroke: #3fb0de"
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
                style="stroke: #6de5c3"
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
import { mapState } from "vuex";
//echarts
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, RadarChart, LineChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent,

  BarChart,
  RadarChart,
  LineChart,

  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export default {
  data() {
    return {
      progress: 65,
      rate: 45,
    };
  },
  computed: {
    ...mapState(["oneStudent", "theme"]),
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
  mounted() {
    if (!this.oneStudent._id) {
      this.$router.replace({
        name: "studentList",
      });
    }

    echarts.registerTheme("theme", this.theme);

    const chart1 = echarts.init(this.$refs.chart1, "theme");
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
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        },
      ],
      series: [
        // {
        //   name: "Profit",
        //   type: "bar",
        //   label: {
        //     show: true,
        //     position: "inside",
        //   },
        //   emphasis: {
        //     focus: "series",
        //   },
        //   data: [200, 170, 240, 244, 200, 220, 210],
        // },
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
          data: [320, 302, 341, 374, 390, 450],
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
          data: [-120, -132, -101, -134, -190, -230],
          itemStyle: {},
        },
      ],
    });

    const chart2 = echarts.init(this.$refs.chart2, "theme");
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

    const chart3 = echarts.init(this.$refs.chart3, "theme");
    chart3.setOption({
      title: {
        text: "Stacked Line",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
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
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        // {
        //   name: "Email",
        //   type: "line",
        //   stack: "Total",
        //   data: [120, 132, 101, 134, 90, 230, 210],
        // },
        // {
        //   name: "Union Ads",
        //   type: "line",
        //   stack: "Total",
        //   data: [220, 182, 191, 234, 290, 330, 310],
        // },
        // {
        //   name: "Video Ads",
        //   type: "line",
        //   stack: "Total",
        //   data: [150, 232, 201, 154, 190, 330, 410],
        // },
        // {
        //   name: "Direct",
        //   type: "line",
        //   stack: "Total",
        //   data: [320, 332, 301, 334, 390, 330, 320],
        // },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          data: [820, 0, 901, 934, 0, 1330, 1320],
        },
      ],
    });
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
              stroke: #eeeef0;
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