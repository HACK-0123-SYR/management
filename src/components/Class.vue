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
      const lineChart = this.$echarts.init(this.$refs.lineChart, "theme");
      lineChart.setOption({
        title: {
          text: " 班级平均成绩",
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

      const piechart = this.$echarts.init(this.$refs.pieChart,'theme');
      piechart.setOption({
        title: {
          text: " 班级错题情况",
        },
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 30, name: "rose 1" },
              { value: 34, name: "rose 3" },
              { value: 38, name: "rose 4" },
              { value: 42, name: "rose 2" },
              { value: 46, name: "rose 5" },
            ],
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
    box-shadow: none;
  }
  & > div {
    margin-top: 30px;
    box-shadow: 0 5px 10px 0 rgb(50 50 93 / 35%);
  }
  .back-banner {
    height: 15px;
    width: 100%;
    margin-top: 0;
    i {
      cursor: pointer;
    }
    box-shadow: none;
  }
  .line-chart {
    height: 400px;
    width: 100%;
    // background-color: rgb(225, 254, 245);
    border-radius: 20px;
  }
  .pie-chart {
    height: 600px;
    width: 100%;
    // background-color: rgba(184, 231, 255, 0.401);
    // background-color: #2c343c;
    border-radius: 20px;
  }
}
</style>