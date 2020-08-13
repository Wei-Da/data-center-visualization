<template>
  <div class="w-100 h-100">
    <div class="temperature-title skew">
      数据库状态
      <span class="skew-line"></span>
    </div>
    <div class="temperature-content">
      <div class="left-content">
        <div class="usageRate-container w-50">
          <div class="percent font-size-22">正常</div>
          <div class="usageRate-title">可用性</div>
        </div>
        <div class="usageRate-container w-50">
          <div class="percent font-size-22">80%</div>
          <div class="usageRate-title">表空间</div>
        </div>
        <div class="usageRate-container w-50">
          <div class="percent font-size-22">50%</div>
          <div class="usageRate-title">CPU使用率</div>
        </div>
        <div class="usageRate-container w-50">
          <div class="percent font-size-22">80%</div>
          <div class="usageRate-title">内存使用率</div>
        </div>
        <div class="usageRate-container w-100">
          <div class="percent font-size-12">2020-07-08 18:00</div>
          <div class="usageRate-title">上次备份成功时间</div>
        </div>
      </div>
      <el-carousel indicator-position="outside" class="w-80 h-100">
        <el-carousel-item class="w-100 h-100">
          <v-chart
            ref="businessOperationChart"
            :options="getChartOptions(chartOptions_1)"
            :autoresize="true"
            style="width: calc(100% - 40px); height: 100%;"
          />
          <div class="businessOperationChart-btn">
            <div
              :class="{buttonActive : btnActiveIndex1 === 'h'}"
              class="button"
              @click="changeBtnIndex('h')"
            >1h</div>
            <div
              :class="{buttonActive : btnActiveIndex1 === 'd'}"
              class="button"
              @click="changeBtnIndex('d')"
            >1d</div>
            <div
              :class="{buttonActive : btnActiveIndex1 === 'w'}"
              class="button"
              @click="changeBtnIndex('w')"
            >1w</div>
          </div>
        </el-carousel-item>
        <el-carousel-item class="w-100 h-100">
          <v-chart
            ref="businessOperationChart"
            :options="getChartOptions(chartOptions_2)"
            :autoresize="true"
            style="width: calc(100% - 40px); height: 100%;"
          />
          <div class="businessOperationChart-btn">
            <div
              :class="{buttonActive : btnActiveIndex1 === 'h'}"
              class="button"
              @click="changeBtnIndex('h')"
            >1h</div>
            <div
              :class="{buttonActive : btnActiveIndex1 === 'd'}"
              class="button"
              @click="changeBtnIndex('d')"
            >1d</div>
            <div
              :class="{buttonActive : btnActiveIndex1 === 'w'}"
              class="button"
              @click="changeBtnIndex('w')"
            >1w</div>
          </div>
        </el-carousel-item>
        <el-carousel-item class="w-100 h-100">
          <div class="database-progress">
            <div class="database-title">
              DECLARE job BINARY_INTEGER := :job;  next_date TIMESTAMP WITH TIME ZONE := :mydate;  broken BOOLEAN := FALSE;  job_name VARCHAR2(30) := :job_name;  job_subname VARCHAR2(30) := :job_subname;  job_owner VARCHAR2(30) := :job_owner;  job_start TIMESTAMP WITH TIME ZONE := :job_start;  job_scheduled_start TIMESTAMP WITH TIME ZONE := :job_scheduled_start;  window_start TIMESTAMP WITH TIME ZONE := :window_start;  window_end TIMESTAMP WITH TIME ZONE := :window_end;  chain_id VARCHAR2(14) :=  :chainid;  credential_owner varchar2(30) := :credown;  credential_name  varchar2(30) := :crednam;  destination_owner varchar2(30) := :destown;  destination_name varchar2(30) := :destnam;  job_dest_id varchar2(14) := :jdestid;  log_id number := :log_id;  BEGIN  DECLARE          ename VARCHAR2(30);        BEGIN          ename := dbms_sqltune.execute_tuning_task(                     'SYS_AUTO_SQL_TUNING_TASK');        END;  :mydate := next_date; IF broken THEN :b := 1; ELSE :b := 0; END IF; END; 
            </div>
            <el-progress :color="customColors" :percentage="100" class="w-100" :format="format"></el-progress>
            <div class="database-title">
              call dbms_space.auto_space_advisor_job_proc (  )
            </div>
            <el-progress :color="customColors" :percentage="30" class="w-100" :format="format"></el-progress>
            <div class="database-title">
              call dbms_stats.gather_database_stats_job_proc (  )
            </div>
            <el-progress :color="customColors" :percentage="20" class="w-100" :format="format"></el-progress>
            <div class="database-title">
              begin dbms_feature_usage_internal.exec_db_usage_sampling(:bind1); end;
            </div>
            <el-progress :color="customColors" :percentage="10" class="w-100" :format="format"></el-progress>
            <div class="database-title">
              delete from WRH$_SYSMETRIC_HISTORY tab where (:beg_snap tab.snap_id and         tab.snap_id :end_snap and         dbid = :dbid)    and not exists (select 1 from WRM$_BASELINE b                    where (tab.dbid = b.dbid) and                          (tab.snap_id >= b.start_snap_id) and
            </div>
            <el-progress :color="customColors" :percentage="3" class="w-100" :format="format"></el-progress>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import echartsDefaultFun from "../mixins/echartsDefaultFun"
import { defaultArrayLength } from '../mixins/defaultArrayLength'

export default {
  mixins: [echartsDefaultFun],
  props: {
    activeIndex: Number
  },
  watch: {
    activeIndex() {
      this.chartOptions_1.seriesData = this.getSeriesData(100, defaultArrayLength)
      this.chartOptions_2.seriesData = [this.getSeriesData(100, defaultArrayLength), this.getSeriesData(100, defaultArrayLength)]
    }
  },
  data() {
    return {
      btnActiveIndex1: 'h',
      chartOptions_1: {
        name: "当前命中率",
        max: 100,
        legendFormatter: " 100%",
        areaColor: "#d59934",
        xAxisData: this.getxAxisData('h', 1, defaultArrayLength),
        yAxisName: '',
        yAxisLabel: "%",
        tooltipSymbol: "%",
        seriesData: this.getSeriesData(100, defaultArrayLength),
      },
      chartOptions_2: {
        name: ["当前连接数", "当前死锁数"],
        max: 100,
        legendFormatter: " 50个",
        areaColor: ["#d59934", "#fd2c4f"],
        xAxisData: this.getxAxisData('h', 1, defaultArrayLength),
        yAxisName: '',
        yAxisLabel: "个",
        tooltipSymbol: "个",
        seriesData: [this.getSeriesData(100, defaultArrayLength), this.getSeriesData(100, defaultArrayLength)],
      },
        customColors: [
          {color: 'rgb(145, 234, 255)', percentage: 20},
          {color: 'rgb(129, 212, 249)', percentage: 40},
          {color: 'rgb(106, 181, 239)', percentage: 60},
          {color: 'rgb(83, 154, 233)', percentage: 80},
          {color: 'rgb(65, 132, 224)', percentage: 100}
        ]
    };
  },
  methods: {
    format(percentage) {
      return (percentage / 3).toFixed(0) + "s"
    },
    changeBtnIndex(index) {
      this.btnActiveIndex1 = index;
      this.chartOptions_1.xAxisData = this.getxAxisData(index, 1, defaultArrayLength)
      this.chartOptions_1.seriesData = this.getSeriesData(100, defaultArrayLength)
      this.chartOptions_2.xAxisData = this.getxAxisData(index, 1, defaultArrayLength)
      this.chartOptions_2.seriesData = [this.getSeriesData(100, defaultArrayLength), this.getSeriesData(100, defaultArrayLength)]
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
      height: 30%;

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

.database-progress {
  display: flex;
  flex-direction: column;
  justify-content: space-between
  width: 100%;
  height: 100%;
  padding: 1% 5%;
  box-sizing: border-box;
  .database-title {
    width: 80%;
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.875em;
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

>>>.el-progress-bar__outer {
  background-color: #171C47;
}
</style>