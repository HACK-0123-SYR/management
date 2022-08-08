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
        <div class="name">班级：{{ theClass }}</div>
        <div class="num">人数：{{ count }}</div>
      </div>
    </div>

    <div class="line-chart" ref="lineChart"></div>
    <div class="pie-chart" ref="pieChart"></div>
  </div>
</template>

<script>
import { request } from "@/request/index.js";

export default {
  data() {
    return {
      classStatus: [],
      count: 0,
    };
  },
  props: ["theClass"],
  watch: {
    classStatus(newValue) {
      const lineChart = this.$echarts.init(this.$refs.lineChart);
      lineChart.setOption({
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
            data: newValue,
          },
        ],
      });

      const piechart = this.$echarts.init(this.$refs.pieChart);
      piechart.setOption({
        // backgroundColor: "#2c343c",
        title: {
          text: "Customized Pie",
          left: "center",
          top: 20,
          textStyle: {
            color: "#ccc",
          },
        },
        tooltip: {
          trigger: "item",
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1],
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              { value: 335, name: "Direct" },
              { value: 310, name: "Email" },
              { value: 274, name: "Union Ads" },
              { value: 235, name: "Video Ads" },
              { value: 400, name: "Search Engine" },
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: "radius",
            label: {
              color: "rgba(255, 255, 255, 0.3)",
            },
            labelLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)",
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            itemStyle: {
              color: "#c23531",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function (idx) {
              return Math.random() * 200;
            },
          },
        ],
      });
    },
  },
  methods: {
    back() {
      this.$router.back();
    },
    async getClassInfo(theClass) {
      const res = await request({
        url: "/teacher/getClassStatus",
        method: "POST",
        data: {
          theClass,
        },
      });
      if (res.data.code == 200) {
        this.classStatus = res.data.data.classStatus;
        this.count = res.data.data.count;
      } else {
        //
      }
    },
  },
  mounted() {
    console.log(this.theClass);
    //获取班级总体情况
    this.getClassInfo(this.theClass);
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
  align-content: flex-start;
  flex-wrap: wrap;
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
        margin-left: 20px;
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
  .line-chart {
    height: 400px;
    width: 100%;
    background-color: rgb(225, 254, 245);
    border-radius: 20px;
  }
  .pie-chart {
    height: 400px;
    width: 100%;
    // background-color: rgba(184, 231, 255, 0.401);
    background-color: #2c343c;
    border-radius: 20px;
  }
}
</style>