<template>
	<div class='goods'>
		<!-- <div class='toolBar' flex='main:justify' style='height:6%'>
            <i class='iconfont icon-back' @click="$router.push('/home')"></i>
            <i class='iconfont icon-add' @click="addPopVisible=true"></i>
        </div> -->
		<div style='height:94%'>
			<div id='charts' style='width:100%;height:100%'></div>
		</div>
    </div>
</template>

<script>
import { Toast } from "vant";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
import * as Fetch from "../../utils/fetch";

export default {
  components: {},
  data() {
    return {
      initOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["今日出货", "今日完成"]
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
          type: "category",
          data: []
        },
        series: [
          {
            name: "今日出货",
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
            name: "今日完成",
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
  methods: {
    renderCharts() {
      Toast.loading("加载中...");
      setTimeout(() => {
        Toast.clear();
        let goodsSummary = Fetch.goodsSummary(new Date(), "day");
        let exportSummary = Fetch.exportSummary(new Date(), "day");
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
</style>


