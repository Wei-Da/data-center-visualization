<template>
  <div class="masterServerProcess">
    <div class="masterServerProcess-top">
      <div class="masterServer-item">
        <div class="m-r-8 masterServer-circle background-green"></div>
        <div class="m-r-10">进程实时内存</div>
        <div>8%</div>
      </div>
      <div class="masterServer-item">
        <div class="m-r-8 masterServer-circle background-blue"></div>
        <div class="m-r-10">进程实时内存</div>
        <div>8%</div>
      </div>
      <div class="masterServer-item">
        <div class="m-r-8 masterServer-circle background-yellow"></div>
        <div class="m-r-10">进程实时内存</div>
        <div>8%</div>
      </div>
      <div class="masterServer-item">
        <div class="m-r-8 masterServer-circle background-white"></div>
        <div class="m-r-10">进程实时内存</div>
        <div>8%</div>
      </div>
      <div class="masterServer-item">
        <div class="m-r-8 masterServer-circle background-purple"></div>
        <div class="m-r-10">进程实时内存</div>
        <div>8%</div>
      </div>
      <div class="masterServer-item">
        <div class="m-r-8 masterServer-circle background-red"></div>
        <div class="m-r-10">进程实时内存</div>
        <div>8%</div>
      </div>
    </div>
    <el-carousel indicator-position="outside" class="masterServerProcess-bottom">
      <el-carousel-item class="w-100 h-100">
        <div class="masterServerChart">
          <v-chart
            ref="masterServerChart"
            :options.sync="primaryServer"
            :autoresize="true"
            style="width: 100%; height: 100%;"
          />
        </div>
        <div class="masterServerChart-btn">
          <div
            :class="{buttonActive : btnActiveIndex === 0}"
            class="button"
            @click="changeBtnIndex(0)"
          >5m</div>
          <div
            :class="{buttonActive : btnActiveIndex === 1}"
            class="button"
            @click="changeBtnIndex(1)"
          >1h</div>
          <div
            :class="{buttonActive : btnActiveIndex === 2}"
            class="button"
            @click="changeBtnIndex(2)"
          >24h</div>
        </div>
      </el-carousel-item>
      <el-carousel-item class="w-100 h-100">
        <div class="masterServerChart">
          <v-chart
            ref="masterServerChart"
            :options.sync="standbyServer"
            :autoresize="true"
            style="width: 100%; height: 100%;"
          />
        </div>
        <div class="masterServerChart-btn">
          <div
            :class="{buttonActive : btnActiveIndex === 0}"
            class="button"
            @click="changeBtnIndex(0)"
          >5m</div>
          <div
            :class="{buttonActive : btnActiveIndex === 1}"
            class="button"
            @click="changeBtnIndex(1)"
          >1h</div>
          <div
            :class="{buttonActive : btnActiveIndex === 2}"
            class="button"
            @click="changeBtnIndex(2)"
          >24h</div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import echarts from "echarts";
import moment from 'moment'

let primaryServer = {
  grid: {
    left: 60,
    bottom: 20,
    right: 30,
    top: 50
  },
  title: {
    text: "主服务器进程",
    left: "center",
    top: 10,
    textStyle: {
      color: "#96acd4",
      fontSize: 14
    }
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
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
    max: 100,
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
      formatter: "{value} %"
    }
  },
  series: [
    {
      name: "重要",
      data: [],
      type: "line",
      symbol: "circle",
      symbolSize: 10,
      itemStyle: {
        color: "#fd2c4f"
      },
      lineStyle: {
        color: "#fd2c4f"
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
                color: "#fd2c4f"
              },
              {
                offset: 1,
                color: "#181933"
              }
            ],
            false
          )
        }
      }
    },
    {
      name: "紧急",
      data: [],
      type: "line",
      symbol: "circle",
      symbolSize: 10,
      itemStyle: {
        color: "#d59934"
      },
      lineStyle: {
        color: "#d59934"
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
                color: "#d59934"
              },
              {
                offset: 1,
                color: "#181933"
              }
            ],
            false
          )
        }
      }
    }
  ]
};

let standbyServer = {
  grid: {
    left: 60,
    bottom: 20,
    right: 30,
    top: 50
  },
  title: {
    text: "备服务器进程",
    left: "center",
    top: 10,
    textStyle: {
      color: "#96acd4",
      fontSize: 14
    }
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
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
    max: 100,
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
      formatter: "{value} %"
    }
  },
  series: [
    {
      name: "重要",
      data: [],
      type: "line",
      symbol: "circle",
      symbolSize: 10,
      itemStyle: {
        color: "#fd2c4f"
      },
      lineStyle: {
        color: "#fd2c4f"
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
                color: "#fd2c4f"
              },
              {
                offset: 1,
                color: "#181933"
              }
            ],
            false
          )
        }
      }
    },
    {
      name: "紧急",
      data: [],
      type: "line",
      symbol: "circle",
      symbolSize: 10,
      itemStyle: {
        color: "#d59934"
      },
      lineStyle: {
        color: "#d59934"
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
                color: "#d59934"
              },
              {
                offset: 1,
                color: "#181933"
              }
            ],
            false
          )
        }
      }
    }
  ]
};

export default {
  props: {
    menuIndex: Number
  },
  watch: {
    menuIndex(index) {
      this.btnActiveIndex = 0;
      this.primaryServer.xAxis.data = this.fiveMinutesArr;
      this.standbyServer.xAxis.data = this.fiveMinutesArr;
      this.primaryServer.series[0].data = this.menuData[
        index
      ].fiveMinutes.important;
      this.primaryServer.series[1].data = this.menuData[
        index
      ].fiveMinutes.emergency;
      this.standbyServer.series[0].data = this.getRandomArrayData()
      this.standbyServer.series[1].data = this.getRandomArrayData()
    }
  },
  mounted() {
    this.fiveMinutesArr = []
    this.oneHoursArr = []
    this.twentyFourHoursArr = []
    for(let i = 5; i > 0; i--) {
      this.fiveMinutesArr.push(moment().subtract(i, 'minutes').format('HH:mm'))
    }
    for(let i = 60; i > 0; i-=12) {
      this.oneHoursArr.push(moment().subtract(i, 'minutes').format('HH:mm'))
    }
    for(let i = 24; i > 0; i-=5) {
      this.twentyFourHoursArr.push(moment().subtract(i, 'hours').format('D号 HH:mm'))
    }
    this.primaryServer.xAxis.data = this.fiveMinutesArr;
    this.standbyServer.xAxis.data = this.fiveMinutesArr;
    this.primaryServer.series[0].data = this.menuData[0].fiveMinutes.important;
    this.primaryServer.series[1].data = this.menuData[0].fiveMinutes.emergency;
    this.standbyServer.series[0].data = this.getRandomArrayData();
    this.standbyServer.series[1].data = this.getRandomArrayData();
  },
  data() {
    return {
      btnActiveIndex: 0,
      primaryServer: primaryServer,
      standbyServer: standbyServer,
      fiveMinutesArr: [],
      oneHoursArr: [],
      twentyFourHoursArr: [],
      menuData: [
        {
          id: 0,
          name: "原油管道",
          fiveMinutes: {
            important: [70, 72, 74, 72, 74],
            emergency: [55, 40, 30, 36, 35]
          },
          oneHours: {
            important: [60, 76, 88, 72, 64],
            emergency: [36, 48, 50, 56, 55]
          },
          twentyFourHours: {
            important: [50, 60, 65, 70, 80],
            emergency: [40, 50, 55, 65, 70]
          }
        },
        {
          id: 1,
          name: "成品油管道",
          fiveMinutes: {
            important: [21, 33, 36, 37, 33],
            emergency: [38, 34, 22, 33, 39]
          },
          oneHours: {
            important: [30, 26, 36, 20, 10],
            emergency: [71, 74, 74, 79, 85]
          },
          twentyFourHours: {
            important: [38, 21, 15, 43, 31],
            emergency: [71, 85, 32, 80, 51]
          }
        },
        {
          id: 2,
          name: "天然气",
          fiveMinutes: {
            important: [61, 83, 87, 97, 85],
            emergency: [83, 71, 66, 67, 65]
          },
          oneHours: {
            important: [24, 20, 22, 70, 69],
            emergency: [28, 14, 43, 32, 54]
          },
          twentyFourHours: {
            important: [50, 66, 66, 55, 91],
            emergency: [69, 52, 42, 92, 61]
          }
        },
        {
          id: 3,
          name: "兰郑长管道",
          fiveMinutes: {
            important: [61, 65, 79, 80, 91],
            emergency: [66, 93, 61, 56, 50]
          },
          oneHours: {
            important: [99, 55, 40, 37, 24],
            emergency: [84, 92, 81, 90, 76]
          },
          twentyFourHours: {
            important: [57, 76, 64, 69, 78],
            emergency: [53, 55, 58, 58, 50]
          }
        },
        {
          id: 4,
          name: "西二线管道",
          fiveMinutes: {
            important: [79, 79, 72, 84, 79],
            emergency: [87, 83, 72, 64, 72]
          },
          oneHours: {
            important: [60, 76, 88, 72, 64],
            emergency: [36, 48, 50, 56, 55]
          },
          twentyFourHours: {
            important: [50, 60, 65, 70, 80],
            emergency: [40, 50, 55, 65, 70]
          }
        },
        {
          id: 5,
          name: "中亚管道",
          fiveMinutes: {
            important: [70, 72, 74, 72, 74],
            emergency: [55, 40, 30, 36, 35]
          },
          oneHours: {
            important: [60, 76, 88, 72, 64],
            emergency: [36, 48, 50, 56, 55]
          },
          twentyFourHours: {
            important: [50, 60, 65, 70, 80],
            emergency: [40, 50, 55, 65, 70]
          }
        },
        {
          id: 6,
          name: "石兰惠银管道",
          fiveMinutes: {
            important: [70, 72, 74, 72, 74],
            emergency: [55, 40, 30, 36, 35]
          },
          oneHours: {
            important: [60, 76, 88, 72, 64],
            emergency: [36, 48, 50, 56, 55]
          },
          twentyFourHours: {
            important: [50, 60, 65, 70, 80],
            emergency: [40, 50, 55, 65, 70]
          }
        },
        {
          id: 7,
          name: "漠大管道",
          fiveMinutes: {
            important: [70, 72, 74, 72, 74],
            emergency: [55, 40, 30, 36, 35]
          },
          oneHours: {
            important: [60, 76, 88, 72, 64],
            emergency: [36, 48, 50, 56, 55]
          },
          twentyFourHours: {
            important: [50, 60, 65, 70, 80],
            emergency: [40, 50, 55, 65, 70]
          }
        },
        {
          id: 8,
          name: "长长吉、泰青威管道",
          fiveMinutes: {
            important: [70, 72, 74, 72, 74],
            emergency: [55, 40, 30, 36, 35]
          },
          oneHours: {
            important: [60, 76, 88, 72, 64],
            emergency: [36, 48, 50, 56, 55]
          },
          twentyFourHours: {
            important: [50, 60, 65, 70, 80],
            emergency: [40, 50, 55, 65, 70]
          }
        },
        {
          id: 9,
          name: "中贵管道",
          fiveMinutes: {
            important: [70, 72, 74, 72, 74],
            emergency: [55, 40, 30, 36, 35]
          },
          oneHours: {
            important: [60, 76, 88, 72, 64],
            emergency: [36, 48, 50, 56, 55]
          },
          twentyFourHours: {
            important: [50, 60, 65, 70, 80],
            emergency: [40, 50, 55, 65, 70]
          }
        },
        {
          id: 10,
          name: "兰城原油管道",
          fiveMinutes: {
            important: [70, 72, 74, 72, 74],
            emergency: [55, 40, 30, 36, 35]
          },
          oneHours: {
            important: [60, 76, 88, 72, 64],
            emergency: [36, 48, 50, 56, 55]
          },
          twentyFourHours: {
            important: [50, 60, 65, 70, 80],
            emergency: [40, 50, 55, 65, 70]
          }
        },
        {
          id: 11,
          name: "锦郑成品油管道",
          fiveMinutes: {
            important: [70, 72, 74, 72, 74],
            emergency: [55, 40, 30, 36, 35]
          },
          oneHours: {
            important: [60, 76, 88, 72, 64],
            emergency: [36, 48, 50, 56, 55]
          },
          twentyFourHours: {
            important: [50, 60, 65, 70, 80],
            emergency: [40, 50, 55, 65, 70]
          }
        },
        {
          id: 12,
          name: "中俄东天然气管道",
          fiveMinutes: {
            important: [70, 72, 74, 72, 74],
            emergency: [55, 40, 30, 36, 35]
          },
          oneHours: {
            important: [60, 76, 88, 72, 64],
            emergency: [36, 48, 50, 56, 55]
          },
          twentyFourHours: {
            important: [50, 60, 65, 70, 80],
            emergency: [40, 50, 55, 65, 70]
          }
        }
      ]
    };
  },
  methods: {
    changeBtnIndex(index) {
      this.btnActiveIndex = index;
      if (index === 0) {
        this.primaryServer.xAxis.data = this.fiveMinutesArr;
        this.standbyServer.xAxis.data = this.fiveMinutesArr;
        this.primaryServer.series[0].data = this.menuData[this.menuIndex].fiveMinutes.important;
        this.primaryServer.series[1].data = this.menuData[this.menuIndex].fiveMinutes.emergency;
        this.standbyServer.series[0].data = this.getRandomArrayData();
        this.standbyServer.series[1].data = this.getRandomArrayData();
      } else if (index === 1) {
        this.primaryServer.xAxis.data = this.oneHoursArr;
        this.standbyServer.xAxis.data = this.oneHoursArr;
        this.primaryServer.series[0].data = this.menuData[this.menuIndex].oneHours.important;
        this.primaryServer.series[1].data = this.menuData[this.menuIndex].oneHours.emergency;
        this.standbyServer.series[0].data = this.getRandomArrayData();
        this.standbyServer.series[1].data = this.getRandomArrayData();
      } else if (index === 2) {
        this.primaryServer.xAxis.data = this.twentyFourHoursArr;
        this.standbyServer.xAxis.data = this.twentyFourHoursArr;
        this.primaryServer.series[0].data = this.menuData[this.menuIndex].twentyFourHours.important;
        this.primaryServer.series[1].data = this.menuData[this.menuIndex].twentyFourHours.emergency;
        this.standbyServer.series[0].data = this.getRandomArrayData();
        this.standbyServer.series[1].data = this.getRandomArrayData();
      }
    },
    getRandomArrayData() {
      let arr = []
      for(let i = 0; i < 5; i++) {
        let num = Math.random()*100
        arr.push(num.toFixed(0))
      }
      return arr
    }
  }
};
</script>

<style lang="stylus" scoped>
.w-100 {
  width: 100%;
}

.h-100 {
  height: 100%;
}

.m-r-10 {
  margin-right: 10px;
}

.m-r-8 {
  margin-right: 8px;
}

.masterServerProcess {
  width: 100%;
  height: 100%;

  .masterServerProcess-top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    height: 20%;
    font-size: 13px;

    .masterServer-item {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      width: 33%;
      height: 50%;
      color: #96acd4;

      .masterServer-circle {
        width: 11px;
        height: 11px;
        border-radius: 50%;
      }

      .background-green {
        background: #2efdb4;
      }

      .background-blue {
        background: #00eaff;
      }

      .background-yellow {
        background: #d59934;
      }

      .background-white {
        background: #fff;
      }

      .background-purple {
        background: #7d34d4;
      }

      .background-red {
        background: #fd2c4f;
      }
    }
  }

  .masterServerProcess-bottom {
    width: 100%;
    height: 80%;

    .masterServerChart {
      width: calc(100% - 40px);
      height: 100%;
    }

    .masterServerChart-btn {
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