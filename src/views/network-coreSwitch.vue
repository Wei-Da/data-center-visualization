<template>
  <div class="coreSwitch-wrapper">
    <div class="title skew">核心路由<span class="skew-line"></span></div>
    <el-carousel :interval="4000" indicator-position="outside" class="coreRouter-carousel">
      <el-carousel-item class="w-100 h-100">
        <div class="coreSwitch-container">
          <div class="deviceInfo">
            <div class="device-wrapper">
              <div class="device-name">
                设备名称
              </div>
              <div class="device-name-value">
                AHD-Y123GKFHGI2T8
              </div>
            </div>
            <div class="device-wrapper">
              <div class="device-name">
                设备IP
              </div>
              <div class="device-name-value">
                192.168.1.175
              </div>
            </div>
            <div class="usageRate">
              <div class="usageRate-container">
                <div class="percent">12%</div>
                <div class="usageRate-title">CPU使用率</div>
              </div>
              <div class="usageRate-container">
                <div class="percent">33%</div>
                <div class="usageRate-title">内存使用率</div>
              </div>
            </div>
          </div>
          <div class="coreSwitch-chart">
              <v-chart
                ref="coreSwitchChart"
                :options.sync="coreSwitchOption"
                :autoresize="true"
                style="width: 100%; height: 100%;"
              />
          </div>
        </div>
      </el-carousel-item>
      <el-carousel-item class="w-100 h-100">
        <div class="coreSwitch-container">
          <div class="deviceInfo">
            <div class="device-wrapper">
              <div class="device-name">
                设备名称
              </div>
              <div class="device-name-value">
                WIN-NOUN91D916L
              </div>
            </div>
            <div class="device-wrapper">
              <div class="device-name">
                设备IP
              </div>
              <div class="device-name-value">
                192.168.1.183
              </div>
            </div>
            <div class="usageRate">
              <div class="usageRate-container">
                <div class="percent">35%</div>
                <div class="usageRate-title">CPU使用率</div>
              </div>
              <div class="usageRate-container">
                <div class="percent">45%</div>
                <div class="usageRate-title">内存使用率</div>
              </div>
            </div>
          </div>
          <div class="coreSwitch-chart">
              <v-chart
                ref="coreRouterChart"
                :options.sync="coreRouterOption"
                :autoresize="true"
                style="width: 100%; height: 100%;"
              />
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import echarts from "echarts";
import echartsDefaultFun from "../mixins/echartsDefaultFun";

let OPTIONS = {
  grid: {
    left: 70,
    bottom: 20,
    right: 20,
    top: 50
  },
  legend: {
    data: ['实时接收', '实时发送'],
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
      if(name === "实时接收") {
        return "当前接受 19 Mbps"
      } else if(name === "实时发送") {
        return "当前发送 42 Mbps"
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
        return params[0].axisValue + '<br />' + params[0].marker + params[0].seriesName + ': ' + params[0].value + ' Mbps' + '<br/>' + params[1].marker + params[1].seriesName + ': ' + params[1].value + ' Mbps'
      } else {
        return params[0].axisValue + '<br />' + params[0].marker + params[0].seriesName + ': ' + params[0].value + ' Mbps'
      }
    }
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30'],
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
      formatter: "{value} Mbps"
    }
  },
  series: [
    {
      name: "实时发送",
      data: [],
      type: "line",
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
      name: "实时接收",
      data: [],
      type: "line",
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

export default {
  mixins: [echartsDefaultFun],
  mounted() {
    this.coreSwitchOption.series[0].data = this.getSeriesData(100, 7)
    this.coreSwitchOption.series[1].data = this.getSeriesData(100, 7)
    this.coreRouterOption.series[0].data = this.getSeriesData(100, 7)
    this.coreRouterOption.series[1].data = this.getSeriesData(100, 7)

    let dataIndex = -1
    const coreSwitchChart = this.$refs.coreSwitchChart
    const coreRouterChart = this.$refs.coreRouterChart
    const dataLen = coreSwitchChart.options.series[0].data.length

    this.timer = setInterval(() => {
      coreSwitchChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex
      })
      coreRouterChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex
      })
      dataIndex = (dataIndex + 1) % dataLen
      coreSwitchChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex
      })
      coreRouterChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex
      })
      // 显示 tooltip
      coreSwitchChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex
      })
      coreRouterChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex
      })
    }, 1000)
  },
  data() {
    return {
      coreSwitchOption: this._.cloneDeep(OPTIONS),
      coreRouterOption: this._.cloneDeep(OPTIONS)
    }
  },
  destroyed() {
    if (this.timer) clearInterval(this.timer)
  }
}
</script>

<style lang="stylus" scoped>
  .skew-line {
    position: absolute;
    left: 120px;
    width: 77%;
    background: #2f51d1;
    height: 2px;
    top: 50%;
    transform: translate(0px, -50%);
  }
  .coreSwitch-wrapper {
    width: 100%;
    height: 100%;
    .coreRouter-carousel {
      width: 100%;
      height: calc(100% - 20px);
    }
    .title {
      position: relative
      font-size: 14px;
      color: #FFF;
      width: 100%;
      height: 20px;
    }
    .coreSwitch-container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      .deviceInfo {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 40%;
        height: 100%;
        .device-wrapper {
          width: 100%;
          height: 30%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        .device-name {
          font-size: 16px;
          color: #96acd4;
        }
        .device-name-value {
          font-size: 16px;
          color: #4d87ff;
        }
        .usageRate {
          width: 100%;
          height: 30%;
          display: flex;
          justify-content: space-between;
          .usageRate-container {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            width: 50%;
            .percent {
              color: #2efdb4;
              font-size: 22px;
              margin-bottom: 10px;
            }
            .usageRate-title {
              color: #96acd4;
              font-size: 12px;
            }
          }
        }
      }
      .coreSwitch-chart {
        width: 60%;
        height: 100%;
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
  }
</style>