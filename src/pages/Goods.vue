<template>
	<div class='goods'>
		 <div flex='main:right cross:center' style='position:fixed;top:.4rem;right:.4rem'  class='bar'>
			<div @click='$refs.monthPicker.toggle()'>
				<i class='iconfont icon-calendar'></i>
				<span>{{monthName}}</span>
			</div>
		</div>
		<div style='height:100%'>
			<div id='charts' style='width:100%;height:100%'></div>
		</div>

        <month-picker ref='monthPicker' @change='monthChoose'></month-picker>

    </div>

</template>

<script>
import { Toast, Popup, Button } from "vant";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
import MonthPicker from "../components/monthPicker";
import dayjs from "dayjs";

import * as Fetch from "../../utils/fetch";

export default {
  components: {
    VanPopup: Popup,
    VanButton: Button,
    MonthPicker: MonthPicker
  },
  data() {
    return {
      chooseMonth: new Date(),
      initOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10,
            yAxisIndex: [0, 1]
          }
        ],
        legend: {
          data: ["当月出货", "当月完成"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
			boundaryGap : false,
          type: "category",
          data: []
        },
        series: [
          {
            name: "当月出货",
            type: "bar",
            data: [],
            label: {
              normal: {
                show: true,
                position: "right"
              }
            }
          },
          {
            name: "当月完成",
            type: "bar",
            data: [],
            label: {
              normal: {
                show: true,
                position: "right"
              }
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.renderCharts();
  },
  computed: {
    monthName: function() {
      return dayjs(this.chooseMonth).format("YYYY-MM");
    }
  },
  methods: {
    monthChoose(month) {
      this.chooseMonth = month;
      this.renderCharts(month);
    },
    renderCharts(month) {
      Toast.loading("加载中...");
      setTimeout(() => {
        Toast.clear();
        let goodsSummary = Fetch.goodsSummary(month);
        let exportSummary = Fetch.exportSummary(month);
        let chartsOption = this.initOption;

        let exportData = Object.values(exportSummary);
        let finishData = Object.values(goodsSummary).map(item => item.num);

        chartsOption.yAxis.data = Object.keys(goodsSummary).filter(
          (item, index) => !!exportData[index] || !!finishData[index]
        );
        chartsOption.series[0].data = exportData.filter(
          (item, index) => !!item || !!finishData[index]
        );
        chartsOption.series[1].data = finishData.filter(
          (item, index) => !!item || !!exportData[index]
        );

        if (chartsOption.yAxis.data.length == 0) {
          Toast.fail({
            message: "当月无数据",
            duration: 1000
          });
        }
        // 图表渲染
        let myChart = echarts.init(document.getElementById("charts"));
        myChart.setOption(chartsOption);
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
.goods {
  padding: 0.4rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.dialogTitle {
  background: #fff;
  font-size: 18px;
  font-weight: normal;
}
</style>


