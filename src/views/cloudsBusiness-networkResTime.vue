<template>
  <div class="w-100 h-100">
    <div class="temperature-title skew">
        当前抖动值
      <span class="skew-line"></span>
    </div>
    <div class="temperature-content">
      <div class="left-content">
        <div class="usageRate-container w-50 transform-topLeft">
          <div class="percent font-size-22">1ms</div>
          <div class="usageRate-title">上次</div>
        </div>
        <div class="usageRate-container w-50 transform-topRight">
          <div class="percent font-size-22">10ms</div>
          <div class="usageRate-title">最大</div>
        </div>

        <div class="usageRate-container w-50 transform-bottomLeft">
          <div class="percent font-size-22">1ms</div>
          <div class="usageRate-title">平均</div>
        </div>
        <div class="usageRate-container w-50 transform-bottomRight">
          <div class="percent font-size-22">2ms</div>
          <div class="usageRate-title">最小</div>
        </div>
      </div>
      <v-chart
        ref="businessOperationChart"
        :options="getChartOptions(chartOptions)"
        :autoresize="true"
        style="width: calc(80% - 40px); height: 100%;"
      />
      <div class="businessOperationChart-btn">
        <div
          :class="{buttonActive : btnActiveIndex1 === 'm'}"
          class="button"
          @click="changeBtnIndex1('m')"
        >1m</div>
        <div
          :class="{buttonActive : btnActiveIndex1 === 'h'}"
          class="button"
          @click="changeBtnIndex1('h')"
        >1h</div>
        <div
          :class="{buttonActive : btnActiveIndex1 === 'd'}"
          class="button"
          @click="changeBtnIndex1('d')"
        >1d</div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import echartsDefaultFun from "../mixins/echartsDefaultFun"
import { defaultArrayLength } from '../mixins/defaultArrayLength'

let CHARTOPTIONS = {
  grid: {
    left: 40,
    bottom: 20,
    right: 20,
    top: 40,
  },
  legend: {
    data: [],
    formatter: "",
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
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
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
    name: '',
    nameLocation: 'end',
    nameTextStyle: {
      color: '#96acd4'
    },
    max: "",
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
      formatter: "",
    },
  },
  series: [],
};

export default {
  mixins: [echartsDefaultFun],
  props: {
    activeIndex: Number
  },
  watch: {
    activeIndex(value) {
      this.chartOptions.seriesData = this.getSeriesData(10, defaultArrayLength)
    }
  },
  data() {
    return {
      btnActiveIndex1: 'm',
      chartOptions: {
        name: ["当前抖动值", "当前抖动值", "当前延时值"],
        legendFormatter: " 【-10ms, 25ms】",
        areaColor: ["#0469d8", "#0469d8", "#fd2c4f"],
        xAxisData: this.getxAxisData('m', 1, defaultArrayLength),
        yAxisName: 'ms',
        yAxisLabel: "",
        tooltipSymbol: "ms",
        seriesData: [this.getSeriesData(40, defaultArrayLength), this.getMinusSeriesData(40, defaultArrayLength), this.getSeriesData(100, defaultArrayLength)],
      },
    };
  },
  methods: {
    getChartOptions(options) {
      let chartOptions = this._.cloneDeep(CHARTOPTIONS);
      let isArray = this.typeOf(options.name) === "Array" && this.typeOf(options.seriesData) === "Array" && this.typeOf(options.areaColor) === "Array"
      if(isArray) {

        chartOptions.legend.data = options.name;
        chartOptions.legend.formatter = function(name) {
          if(name === "当前抖动值") {
            return name + " 【-10ms, 25ms】"
          } else {
            return name
          }
        }
        chartOptions.xAxis.data = options.xAxisData;
        chartOptions.yAxis.axisLabel.formatter = "{value}" + options.yAxisLabel;
        chartOptions.yAxis.max = options.max;
        chartOptions.yAxis.name = options.yAxisName;
        
        for(let i = 0; i < options.seriesData.length; i++) {
          chartOptions.series.push({
            name: options.name[i],
            data: options.seriesData[i],
            type: "line",
            symbol: "circle",
            symbolSize: 10,
            itemStyle: {
              color: options.areaColor[i],
            },
            lineStyle: {
              color: options.areaColor[i],
            },
            areaStyle: {
              normal: {
                color: options.areaColor[i],
                opacity: 0.5,
              },
            },
          })
          
        }
        chartOptions.tooltip.formatter = function (params) {
          let lastValue = params[0].axisValue + 
          '<br />' + 
          params[0].marker +
          params[0].seriesName +
          ": " +
          params[0].value +
          options.tooltipSymbol
          for(let i = 1; i < params.length; i++) {
            lastValue += '<br />' + 
            params[i].marker +
            params[i].seriesName +
            ": " +
            params[i].value +
            options.tooltipSymbol
          }
          return lastValue
        };
        
      } else {
        chartOptions.series.push({
          name: options.name,
          data: options.seriesData,
          type: "line",
          symbol: "circle",
          symbolSize: 10,
          itemStyle: {
            color: options.areaColor,
          },
          lineStyle: {
            color: options.areaColor,
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
                    color: options.areaColor,
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
        })
        chartOptions.legend.data[0] = options.name;
        chartOptions.legend.formatter = typeof(options.legendFormatter) === "string" ? "{name}" + options.legendFormatter : options.legendFormatter[0] + " {name} " + options.legendFormatter[1];

        chartOptions.xAxis.data = options.xAxisData;
        chartOptions.yAxis.axisLabel.formatter = "{value}" + options.yAxisLabel;
        chartOptions.yAxis.max = options.max;
        chartOptions.yAxis.name = options.yAxisName;
        chartOptions.tooltip.formatter = function (params) {
          return (
            params[0].axisValue + 
            '<br />' + 
            params[0].marker +
            params[0].seriesName +
            ": " +
            params[0].value +
            options.tooltipSymbol
          );
        };
      }
      
      return chartOptions;
    },
    getMinusSeriesData(max, arrayLength = defaultArrayLength) {
      let seriesData = [];
      for (let i = 0; i < arrayLength; i++) {
        let num = -Math.random() * max;
        seriesData.push(num.toFixed(0));
      }
      return seriesData;
    },
    changeBtnIndex1(index) {
      this.btnActiveIndex1 = index;
      this.chartOptions.xAxisData = this.getxAxisData(index, 1, defaultArrayLength)
      this.chartOptions.seriesData = [this.getSeriesData(40, defaultArrayLength), this.getMinusSeriesData(40, defaultArrayLength), this.getSeriesData(100, defaultArrayLength)]
    }
  }
};
</script>

<style lang="stylus" scoped>

.temperature-title {
  position: relative;
  font-size: 14px;
  color: #FFF;
  width: 100%;
  height: 20px;
  .skew-line {
    position: absolute;
    left: 150px;
    width: 77%;
    background: #2f51d1;
    height: 2px;
    top: 50%;
    transform: translate(0px, -50%);
  }
}

.temperature-content {
  display: flex;
  width: 100%;
  height: calc(100% - 20px);

  .left-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 20%;
    height: 100%;

    .usageRate-container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      height: 50%;

      .percent {
        color: #2efdb4;
      }

      .usageRate-title {
        color: #96acd4;
        font-size: 12px;
      }
    }
  }

  .businessOperationChart-btn {
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