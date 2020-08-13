<template>
  <div class="videoRun-wrapper">
    <div class="rightSide">
      <div class="rightSide-item">
        <div class="item-num">100</div>
        <div class="item-text">摄像机总数</div>
      </div>
      <div class="rightSide-item">
        <div class="item-num">28</div>
        <div class="item-text">摄像机离线</div>
      </div>
      <div class="rightSide-item">
        <div class="item-num">2</div>
        <div class="item-text">摄像机不录像</div>
      </div>
      <div class="rightSide-item">
        <div class="item-num">0</div>
        <div class="item-text">无摄像机计划</div>
      </div>
      <div class="rightSide-item">
        <div class="item-num">0</div>
        <div class="item-text">录像计划变更</div>
      </div>
      <div class="rightSide-item">
        <div class="item-num">20</div>
        <div class="item-text">录像时间不合规数</div>
      </div>
      <div class="rightSide-item">
        <div class="item-num">14</div>
        <div class="item-text">录像丢包数</div>
      </div>
      <div class="rightSide-item">
        <div class="item-num">98%</div>
        <div class="item-text">图像完好率</div>
      </div>
      <div class="rightSide-item">
        <div class="item-num">100</div>
        <div class="item-text">未改密码数量</div>
      </div>
      <div class="rightSide-item">
        <div class="item-num">2</div>
        <div class="item-text">录像高频应用</div>
      </div>
    </div>
    <div class="leftSide">
      <div class="leftSide-items f-l mb-10 mt-5">
        <v-chart
          ref="businessOperationChart"
          :options="getChartOptions(chart_1)"
          :autoresize="true"
          style="width: 100%; height: 80%;"
        />
        <div class="chart-text">
          <span class="gray">摄像机总数</span><span class="f-r green">100</span>
        </div>
        <div class="chart-text">
          <span class="gray">摄像机离线数</span><span class="f-r green">28</span>
        </div>
      </div>
      <div class="leftSide-items f-r mb-10 mt-5">
        <v-chart
          ref="businessOperationChart"
          :options="getChartOptions(chart_2)"
          :autoresize="true"
          style="width: 100%; height: 80%;"
        />
        <div class="chart-text">
          <span class="gray">录像设备总数</span><span class="f-r green">5</span>
        </div>
        <div class="chart-text">
          <span class="gray">录像设备健康数</span><span class="f-r green">1</span>
        </div>
      </div>
      <div class="leftSide-items f-l">
        <v-chart
          ref="businessOperationChart"
          :options="getChartOptions(chart_3)"
          :autoresize="true"
          style="width: 100%; height: 80%;"
        />
        <div class="chart-text">
          <span class="gray">交换机总数</span><span class="f-r green">100</span>
        </div>
        <div class="chart-text">
          <span class="gray">交换机健康数</span><span class="f-r green">72</span>
        </div>
      </div>
      <div class="leftSide-items f-r">
        <v-chart
          ref="businessOperationChart"
          :options="getChartOptions(chart_4)"
          :autoresize="true"
          style="width: 100%; height: 80%;"
        />
        <div class="chart-text">
          <span class="gray">门禁总数</span><span class="f-r green">100</span>
        </div>
        <div class="chart-text">
          <span class="gray">门禁健康数</span><span class="f-r green">72</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

let chartOptions = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
  },
  series: [
    {
      name: "设备健康率",
      type: "pie",
      center: ['50%', '50%'],
      radius: ["70%", "90%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
        formatter: "{d}",
      },
      // emphasis: {
      //     label: {
      //         show: true,
      //         fontSize: '30',
      //         fontWeight: 'bold'
      //     }
      // },
      labelLine: {
        show: false,
      },
      data: [
        {
          value: 0,
          name: "录像设备健康率",
          itemStyle: {
            color: "#f9b63e",
          },
          tooltip: {
            show: false,
          },
        },
        {
          value: 0,
          name: "录像设备健康率",
          itemStyle: {
            color: "#44c6f5",
          },
          label: {
            show: true,
            position: "center",
            formatter: "",
            rich: {
              a: {
                color: "#2efdb4",
                fontSize: 30,
              },
              b: {
                color: "#8f95c8",
                fontSize: 18,
              },
            },
          },
        },
      ],
    },
  ],
};

export default {
  data() {
    return {
      chart_1: {
        name: "摄像机在线率",
        seriesData: 72
      },
      chart_2: {
        name: "录像设备健康率",
        seriesData: 80
      },
      chart_3: {
        name: "交换机健康率",
        seriesData: 72
      },
      chart_4: {
        name: "门禁健康率",
        seriesData: 72
      },
    }
  },
  methods: {
    getChartOptions(options) {
      let echartOptions = this._.cloneDeep(chartOptions)
      echartOptions.series[0].data[0].name = options.name
      echartOptions.series[0].data[1].name = options.name
      echartOptions.series[0].data[0].value = 100 - options.seriesData;
      echartOptions.series[0].data[1].value = options.seriesData;
      echartOptions.series[0].data[1].label.formatter = ["{a|" + options.seriesData + "%}", "{b|" + options.name + "}"].join("\n")
      return echartOptions
    }
  }
};
</script>

<style lang="stylus" scoped>
.f-l {
  float: left;
}

.f-r {
  float: right;
}

.mt-5 {
  margin-top: 5%;
}

.mb-10 {
  margin-bottom: 10%;
}

.green {
  color: #2efdb4;
}

.gray {
  color: #8f95c8;
}

.videoRun-wrapper {
  display: flex;
  width: 100%;
  height: 100%;

  .rightSide {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20%;
    height: 100%;
    margin-right: 5%;

    .rightSide-item {
      width: 100%;
      height: 10%;
      text-align: center;

      .item-num {
        font-size: 1.8em;
        color: #2efdb4;
      }

      .item-text {
        font-size: 1em;
        color: #96acd4;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .leftSide {
    width: 75%;
    height: 100%;

    .leftSide-items {
      width: 45%;
      height: 40%;
      .chart-text {
        width: 100%;
        
      }
    }
  }
}
</style>