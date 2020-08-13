import echarts from "echarts";
import moment from 'moment'
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
  methods: {
    typeOf(value) {
      return Object.prototype.toString.call(value).slice(8, -1)
    },
    getxAxisData(time, timeInterval, arrayLength = defaultArrayLength) {
      let xAxisData = []
      for (let i = 0; i < arrayLength; i += timeInterval) {
        if (time === 'seconds' || time === 's' || time === 'minutes' || time === 'm' || time === 'hours' || time === 'h') {
          xAxisData.push(moment().subtract(i, time).format('H:mm'))
        } else if (time === 'days' || time === 'd' || time === 'weeks' || time === 'w') {
          xAxisData.push(moment().subtract(i, time).format('M月D日'))
        }
      }
      return xAxisData.reverse()
    },
    getSeriesData(max, arrayLength = defaultArrayLength, min = 0, fixed = 0) {
      let seriesData = []
      for (let i = 0; i < arrayLength; i++) {
        let num = Math.random() * max
        if(num >= min && num <= max) {
          seriesData.push(parseFloat(num.toFixed(fixed)))
        } else {
          seriesData.push(parseFloat(min))
        }
      }
      return seriesData
    },
    getChartOptions(options) {
      let chartOptions = this._.cloneDeep(CHARTOPTIONS);
      let isArray = this.typeOf(options.name) === "Array" && this.typeOf(options.seriesData) === "Array" && this.typeOf(options.areaColor) === "Array"
      if(isArray) {

        chartOptions.legend.data = options.name;
        chartOptions.legend.formatter = typeof(options.legendFormatter) === "string" ? "{name}" + options.legendFormatter : options.legendFormatter[0] + " {name} " + options.legendFormatter[1];
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
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: options.areaColor[i],
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
    }
  }
}