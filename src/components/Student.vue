<template>
  <div class="main">
  <div class="back-banner">
      <i class="iconfont icon-xiangzuo1" @click="back"></i>
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

  BarChart,
  RadarChart,
  LineChart,

  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["oneStudent"]),
  },
  methods: {
    back() {
      this.$router.back()
    },
  },
  mounted() {
    if (!this.oneStudent._id) {
      this.$router.replace({
        name: "studentList",
      });
    }

    const chart1 = echarts.init(this.$refs.chart1);
    chart1.setOption({
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });

    const chart2 = echarts.init(this.$refs.chart2);
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
          { name: "Sales", max: 6500 },
          { name: "Administration", max: 16000 },
          { name: "Information Technology", max: 30000 },
          { name: "Customer Support", max: 38000 },
          { name: "Development", max: 52000 },
        ],
      },
      series: [
        {
          name: "Budget vs spending",
          type: "radar",
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000],
              name: "Allocated Budget",
            },
            {
              value: [5000, 14000, 28000, 26000, 42000],
              name: "Actual Spending",
            },
          ],
        },
      ],
    });

    const chart3 = echarts.init(this.$refs.chart3);
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
        {
          name: "Email",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Union Ads",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "Video Ads",
          type: "line",
          stack: "Total",
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "Direct",
          type: "line",
          stack: "Total",
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: "Search Engine",
          type: "line",
          stack: "Total",
          data: [820, 932, 901, 934, 1290, 1330, 1320],
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
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .back-banner{
    height: 35px;
    width: 100%;
    i{
      cursor: pointer;
    }
  }
  .feedback {
    width: 100%;
    height: 320px;
    border-radius: 20px;
    overflow: hidden;
    margin-top: 30px;
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
    background-color: aliceblue;
    border-radius: 10px;
    position: relative;
    // margin:0 auto;
  }
  .radarChart {
    height: 400px;
    width: 45%;
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
    margin-top: 30px;
  }
}
</style>