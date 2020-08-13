<template>
  <div class="networkLinkFlow-wrapper">
    <CommonLayout>
      <div class="network-container">
        <titlebar class="title" title="网络链路可视化"></titlebar>
        <div class="networkLinkFlowTop">
          <div class="networkLink-chartTitle skew">
            广域网流量
            <span class="skew-line"></span>
          </div>
          <div class="networkLink-chart">
            <el-carousel :interval="4000" indicator-position="outside" class="w-100 h-100">
              <el-carousel-item class="w-100 h-100 d-f">
                <v-chart
                  ref="wansChart"
                  :options="getChartOptions(wansOptions)"
                  :autoresize="true"
                  style="width: calc(100% - 40px); height: 100%;"
                />
                <div class="networkLinkFlow-btn">
                  <div
                    :class="{buttonActive : btnActiveIndex === 'h'}"
                    class="button"
                    @click="changeBtnIndex('h')"
                  >1h</div>
                  <div
                    :class="{buttonActive : btnActiveIndex === 'd'}"
                    class="button"
                    @click="changeBtnIndex('d')"
                  >1d</div>
                  <div
                    :class="{buttonActive : btnActiveIndex === 'w'}"
                    class="button"
                    @click="changeBtnIndex('w')"
                  >1w</div>
                </div>
              </el-carousel-item>
              <el-carousel-item class="w-100 h-100 d-f">
                <v-chart
                  ref="wansChart_2"
                  :options="getLineChartOptions(wansOptions_2)"
                  :autoresize="true"
                  style="width: calc(100% - 40px); height: 100%;"
                />
                <div class="networkLinkFlow-btn">
                  <div
                    :class="{buttonActive : btnActiveIndex === 'h'}"
                    class="button"
                    @click="changeBtnIndex('h')"
                  >1h</div>
                  <div
                    :class="{buttonActive : btnActiveIndex === 'd'}"
                    class="button"
                    @click="changeBtnIndex('d')"
                  >1d</div>
                  <div
                    :class="{buttonActive : btnActiveIndex === 'w'}"
                    class="button"
                    @click="changeBtnIndex('w')"
                  >1w</div>
                </div>
              </el-carousel-item>
              <el-carousel-item class="w-100 h-100 d-f">
                <v-chart
                  ref="wansChart_3"
                  :options="getNetworkOptions(wansOptions_3)"
                  :autoresize="true"
                  style="width: calc(100% - 40px); height: 100%;"
                />
                <div class="networkLinkFlow-btn">
                  <div
                    :class="{buttonActive : btnActiveIndex === 'h'}"
                    class="button"
                    @click="changeBtnIndex('h')"
                  >1h</div>
                  <div
                    :class="{buttonActive : btnActiveIndex === 'd'}"
                    class="button"
                    @click="changeBtnIndex('d')"
                  >1d</div>
                  <div
                    :class="{buttonActive : btnActiveIndex === 'w'}"
                    class="button"
                    @click="changeBtnIndex('w')"
                  >1w</div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="netWorkLink">
          <netWorkLink></netWorkLink>
        </div>
        <div class="coreSwitch">
          <coreSwitch></coreSwitch>
        </div>
      </div>
    </CommonLayout>
  </div>
</template>

<script>
import echarts from "echarts";
import titlebar from "./header";
import netWorkLink from "../views/network-link";
import coreSwitch from "../views/network-coreSwitch";
import CommonLayout from "./CommonLayout";
import echartsDefaultFun from "../mixins/echartsDefaultFun";

let chartInitOptions = {
  grid: {
    left: 50,
    bottom: 20,
    right: 30,
    top: 50,
  },
  legend: {
    data: [],
    textStyle: {
      color: "#96acd4",
      fontSize: 16
    },
    top: 0,
    left: "center",
    icon: "circle",
    formatter: ""
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: function (params) {
      if(params[1]) {
        return (
          params[0].axisValue +
          "<br />" +
          params[0].marker +
          params[0].seriesName +
          ": " +
          params[0].value +
          "Mbps" +
          "<br/>" +
          params[1].marker +
          params[1].seriesName +
          ": " +
          Math.abs(params[1].value) + 
          "Mbps"
        );
      } else {
        return (
          params[0].axisValue +
          "<br />" +
          params[0].marker +
          params[0].seriesName +
          ": " +
          Math.abs(params[0].value) + 
          "Mbps"
        );
      }
    },
  },
  xAxis: {
    type: "category",
    data: [],
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: "#96acd4",
    },
    axisPointer: {
      show: true,
    },
  },
  yAxis: {
    type: "value",
    name: "",
    nameLocation: "end",
    nameTextStyle: {
      color: "#96acd4",
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      color: "#96acd4",
      formatter: function (params) {
        return Math.abs(params);
      },
    },
  },
  series: [
    {
      name: "上行流量",
      data: [],
      type: "bar",
      barWidth: 15,
      stack: "总量",
      itemStyle: {
        color: "#46c4f7",
      },
      lineStyle: {
        color: "#46c4f7",
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "#46c4f7",
              },
              {
                offset: 1,
                color: "#181933",
              },
            ],
            false
          ),
        },
      },
    },
    {
      name: "下行流量",
      data: [],
      type: "bar",
      barWidth: 15,
      stack: "总量",
      itemStyle: {
        color: "#d59934",
      },
      lineStyle: {
        color: "#d59934",
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "#d59934",
              },
              {
                offset: 1,
                color: "#181933",
              },
            ],
            false
          ),
        },
      },
    },
  ],
};

let LINEOPTIONS = {
  grid: {
    left: 70,
    bottom: 20,
    right: 20,
    top: 50
  },
  legend: {
    data: ["带宽使用率", "链路丢包率"],
    formatter: '{name}',
    textStyle: {
      color: '#96acd4',
      fontSize: 16
    },
    top: 0,
    left: 'center',
    icon: 'circle',
    itemGap: 50,
    formatter: function(name) {
      if(name === "带宽使用率") {
        return name + " 29%"
      } else if(name === "链路丢包率") {
        return name + " 3%"
      } else {
        return name
      }
    }
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    },
    formatter: function(params) {
      if(params[1]) {
        return params[0].axisValue + '<br />' + params[0].marker + params[0].seriesName + ': ' + Math.abs(params[0].value) + ' %' + '<br/>' + params[1].marker + params[1].seriesName + ': ' + Math.abs(params[1].value) + ' %'
      } else {
        return params[0].axisValue + '<br />' + params[0].marker + params[0].seriesName + ': ' + Math.abs(params[0].value) + ' %'
      }
    }
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [],
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: "#96acd4"
    },
    axisPointer: {
      show: true
    }
  },
  yAxis: {
    type: "value",
    // max: 100,
    // min: -100,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      color: "#96acd4",
      formatter: function (params) {
        return Math.abs(params) + '%';
      },
    }
  },
  series: [
    {
      name: "带宽使用率",
      data: [],
      type: "line",
      // smooth: true,
      symbol: "circle",
      symbolSize: 10,
      itemStyle: {
        color: '#0469d8'
      },
      lineStyle: {
        color: '#0469d8'
      },
      areaStyle: {
        normal: {
          color: '#0469d8',
          opacity: 0.5,
          // color: new echarts.graphic.LinearGradient(
          //   0,
          //   0,
          //   0,
          //   1,
          //   [
          //     {
          //       offset: 0,
          //       color: "#d59934"
          //     },
          //     {
          //       offset: 1,
          //       color: "#181933"
          //     }
          //   ],
          //   false
          // )
        }
      }
    },
    {
      name: "链路丢包率",
      data: [],
      type: "line",
      // smooth: true,
      symbol: "circle",
      symbolSize: 10,
      itemStyle: {
        color: '#d1920c'
      },
      lineStyle: {
        color: '#d1920c'
      },
      areaStyle: {
        normal: {
          color: '#d1920c',
          opacity: 0.5,
          // color: new echarts.graphic.LinearGradient(
          //   0,
          //   0,
          //   0,
          //   1,
          //   [
          //     {
          //       offset: 0,
          //       color: "#fd2c4f"
          //     },
          //     {
          //       offset: 1,
          //       color: "#181933"
          //     }
          //   ],
          //   false
          // )
        }
      }
    },
    
  ]
};

let networkOptions = {
  grid: {
    left: 50,
    bottom: 20,
    right: 30,
    top: 50,
  },
  legend: {
    data: [],
    textStyle: {
      color: "#96acd4",
      fontSize: 16
    },
    top: 0,
    left: "center",
    icon: "circle",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    formatter: "",
    position: function (point, params, dom, rect, size) {
        // 固定在顶部
        return [point[0], '10%'];
    }
  },
  xAxis: {
    type: "category",
    data: [],
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: "#96acd4",
    },
    axisPointer: {
      show: true,
    },
  },
  yAxis: [{
    type: "value",
    scale: true,
    boundaryGap: [0.2, 0.2],
    name: "",
    nameLocation: "end",
    nameTextStyle: {
      color: "#96acd4",
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisLabel: {
      color: "#96acd4",
      formatter: function (params) {
        return Math.abs(params);
      },
    },
    },{
      type: "value",
      scale: true,
      boundaryGap: [0.2, 0.2],
      name: "",
      nameLocation: "end",
      nameTextStyle: {
        color: "#96acd4",
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: "#96acd4",
      },
    }],
  series: [
    {
      name: "网络响应时间",
      yAxisIndex: 0,
      data: [],
      stack: "网络",
      type: "bar",
      barWidth: 15,
      itemStyle: {
        color: "#0469d8",
      },
      lineStyle: {
        color: "#0469d8",
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "#0469d8",
              },
              {
                offset: 1,
                color: "#181933",
              },
            ],
            false
          ),
        },
      },
    },
    {
      name: "网络抖动时间",
      yAxisIndex: 1,
      data: [],
      type: "line",
      // smooth: true,
      symbol: "circle",
      symbolSize: 10,
      barWidth: 15,
      itemStyle: {
        color: "#46c4f7",
      },
      lineStyle: {
        color: "#46c4f7",
      },
      // areaStyle: {
      //   normal: {
      //     color: new echarts.graphic.LinearGradient(
      //       0,
      //       0,
      //       0,
      //       1,
      //       [
      //         {
      //           offset: 0,
      //           color: "#46c4f7",
      //         },
      //         {
      //           offset: 1,
      //           color: "#181933",
      //         },
      //       ],
      //       false
      //     ),
      //   },
      // },
    },
    {
      name: "网络抖动时间",
      yAxisIndex: 1,
      data: [],
      type: "line",
      // smooth: true,
      symbol: "circle",
      symbolSize: 10,
      barWidth: 15,
      itemStyle: {
        color: "#46c4f7",
      },
      lineStyle: {
        color: "#46c4f7",
      },
      // areaStyle: {
      //   normal: {
      //     color: new echarts.graphic.LinearGradient(
      //       0,
      //       0,
      //       0,
      //       1,
      //       [
      //         {
      //           offset: 0,
      //           color: "#46c4f7",
      //         },
      //         {
      //           offset: 1,
      //           color: "#181933",
      //         },
      //       ],
      //       false
      //     ),
      //   },
      // },
    },
    {
      name: "网络延时时间",
      yAxisIndex: 0,
      data: [],
      stack: "网络",
      type: "bar",
      // smooth: true,
      // symbol: "circle",
      // symbolSize: 10,
      barWidth: 15,
      itemStyle: {
        color: "#fd2c4f",
      },
      lineStyle: {
        color: "#fd2c4f",
      },
      // areaStyle: {
      //   normal: {
      //     color: "#fd2c4f",
      //   },
      // },
    },
  ],
};

export default {
  mixins: [echartsDefaultFun],
  components: {
    titlebar,
    netWorkLink,
    coreSwitch,
    CommonLayout,
  },
  mounted() {
    let dataIndex = -1;
    let dataIndex_2 = -1;
    let dataIndex_3 = -1;
    const wansChart = this.$refs.wansChart;
    const wansChart_2 = this.$refs.wansChart_2;
    const wansChart_3 = this.$refs.wansChart_3;
    const dataLen = wansChart.options.series[0].data.length;
    const dataLen_2 = wansChart_2.options.series[0].data.length;
    const dataLen_3 = wansChart_3.options.series[0].data.length;

    this.timer = setInterval(() => {
      wansChart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex,
      });
      dataIndex = (dataIndex + 1) % dataLen;
      wansChart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex,
      });
      wansChart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex,
      });

      wansChart_2.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex,
      });
      dataIndex_2 = (dataIndex_2 + 1) % dataLen_2;
      wansChart_2.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex,
      });
      wansChart_2.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex,
      });

      wansChart_3.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex,
      });
      dataIndex_3 = (dataIndex_3 + 1) % dataLen_3;
      wansChart_3.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex,
      });
      wansChart_3.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex,
      });
    }, 1000);
  },
  data() {
    return {
      btnActiveIndex: "h",
      wansOptions: {
        legendData: ["上行流量", "下行流量"],
        xAxisData: this.getxAxisData("h", 1, 30),
        yAxisName: 'Mbps',
        color: ["#46c4f7", "#d59934"],
        seriesData: [this.getSeriesData(300, 30), this.getMinusSeriesData(300, 30)]
      },
      wansOptions_2: {
        legendData: ["带宽使用率", "链路丢包率"],
        xAxisData: this.getxAxisData("h", 1, 30),
        yAxisName: '%',
        color: ["#46c4f7", "#d59934"],
        seriesData: [this.getSeriesData(100, 30), this.getMinusSeriesData(5, 30)]
      },
      wansOptions_3: {
        legendData: ["网络抖动时间", "网络抖动时间", "网络延时时间"],
        xAxisData: this.getxAxisData("h", 1, 30),
        yAxisName: 'ms',
        color: ["#d1920c", "#d1920c", "#fd2c4f"],
        seriesData: [this.getSeriesData(40, 30), this.getMinusSeriesData(40, 30), this.getSeriesData(10, 30)]
      },
    };
  },
  methods: {
    getNetworkOptions(options) {
      let chartOptions = this._.cloneDeep(networkOptions)
      chartOptions.legend.data = options.legendData
      chartOptions.xAxis.data = options.xAxisData
      chartOptions.yAxis[0].name = options.yAxisName
      chartOptions.yAxis[1].name = options.yAxisName
      chartOptions.tooltip.formatter = function(params) {
        let lastVal = params[0].axisValue + "<br />"
        for(let i = 0; i < params.length; i++) {
          lastVal += params[i].marker +
          params[i].seriesName +
          ": " +
          params[i].value +
          "ms" +
          "<br />"
        }
        return lastVal
      }
      for(let i = 0; i < chartOptions.series.length; i++) {
        chartOptions.series[i].name = options.legendData[i]
        chartOptions.series[i].data = options.seriesData[i]
      }
      return chartOptions
    },
    getLineChartOptions(options) {
      let lineChartOptions = this._.cloneDeep(LINEOPTIONS)
      lineChartOptions.xAxis.data = options.xAxisData
      lineChartOptions.series[0].data = options.seriesData[0]
      lineChartOptions.series[1].data = options.seriesData[1]
      return lineChartOptions
    },
    getChartOptions(options) {
      let chartOptions = this._.cloneDeep(chartInitOptions)
      chartOptions.legend.data = options.legendData
      chartOptions.legend.formatter = function(name) {
        if(name === "上行流量") {
          return "当前" + name + " 35Mbps"
        } else if(name === "下行流量") {
          return "当前" + name + " 189Mbps"
        } else {
          return name
        }
      }
      chartOptions.xAxis.data = options.xAxisData
      chartOptions.yAxis.name = options.yAxisName
      chartOptions.series[0].name = options.legendData[0]
      chartOptions.series[0].data = options.seriesData[0]
      chartOptions.series[1].name = options.legendData[1]
      chartOptions.series[1].data = options.seriesData[1]
      chartOptions.series[0].itemStyle.color = options.color[0]
      chartOptions.series[0].lineStyle.color = options.color[0]
      chartOptions.series[0].areaStyle.normal.color = new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            offset: 0,
            color: options.color[0],
          },
          {
            offset: 1,
            color: "#181933",
          },
        ],
        false
      )
      chartOptions.series[1].itemStyle.color = options.color[1]
      chartOptions.series[1].lineStyle.color = options.color[1]
      chartOptions.series[1].areaStyle.normal.color = new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            offset: 0,
            color: options.color[1],
          },
          {
            offset: 1,
            color: "#181933",
          },
        ],
        false
      )
      return chartOptions
    },
    changeBtnIndex(index) {
      this.btnActiveIndex = index;
      this.wansOptions.xAxisData = this.getxAxisData(index, 1, 30)
      this.wansOptions.seriesData = [this.getSeriesData(300, 30), this.getMinusSeriesData(300, 30)]
      this.wansOptions_2.xAxisData = this.getxAxisData(index, 1, 30)
      this.wansOptions_2.seriesData = [this.getSeriesData(100, 30), this.getMinusSeriesData(100, 30)]
      this.wansOptions_3.xAxisData = this.getxAxisData(index, 1, 30)
      this.wansOptions_3.seriesData = [this.getSeriesData(10, 30), this.getSeriesData(10, 30)]
    },
    getMinusSeriesData(max, arrayLength = defaultArrayLength) {
      let seriesData = [];
      for (let i = 0; i < arrayLength; i++) {
        let num = -Math.random() * max;
        seriesData.push(num.toFixed(0));
      }
      return seriesData;
    },
  },
  destroyed() {
    if (this.timer) clearInterval(this.timer);
  },
};
</script>

<style lang="stylus" scoped>
.w-100 {
  width: 100%;
}

.h-100 {
  height: 100%;
}

.d-f {
  display: flex;
}

.skew-line {
  position: absolute;
  left: 120px;
  width: 77%;
  background: #2f51d1;
  height: 2px;
  top: 50%;
  transform: translate(0px, -50%);
}

.networkLinkFlow-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .title {
    position: absolute;
    top: 2.5%;
    left: 5px;
    width: 100%;
    height: 0;
  }

  .network-container {
    height: 100%;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
  }

  .networkLinkFlowTop {
    width: 100%;
    height: 38%;
    margin-bottom: 2%;

    .networkLink-chartTitle {
      position: relative;
      font-size: 14px;
      color: #FFF;
      width: 100%;
      height: 20px;
    }

    .networkLink-chart {
      display: flex;
      width: 100%;
      height: calc(100% - 20px);

      .networkLinkFlow-btn {
        width: 40px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0px 0px 10px #fff inset;
          cursor: pointer;
          color: #96acd4;
        }

        .buttonActive {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0px 0px 10px #4d87ff inset;
          cursor: pointer;
          color: #4d87ff;
        }
      }
    }
  }

  .netWorkLink {
    width: 100%;
    height: 20%;
    margin-bottom: 2%;
  }

  .coreSwitch {
    width: 100%;
    height: 38%;
  }
}

>>>.el-carousel__container {
  height: 95%;
  width: 100%;
}

>>>.el-carousel__indicators--outside {
  height: 5%;
  line-height: 5%;
  vertical-align: middle;
}

>>>.el-carousel__indicator--horizontal {
  padding: 0px 4px;
}

>>>.el-carousel__item {
  display: flex;
}
</style>