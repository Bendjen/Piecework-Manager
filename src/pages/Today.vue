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
// import {  } from "vant";
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
  components: {},
  data() {
    return {
      chartsOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["利润", "支出", "收入"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "value"
          }
        ],
        yAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        series: [
          {
            name: "利润",
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            data: [200, 170, 240, 244, 200, 220, 210]
          },
          {
            name: "收入",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true
              }
            },
            data: [320, 302, 341, 374, 390, 450, 420]
          },
          {
            name: "支出",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "left"
              }
            },
            data: [-120, -132, -101, -134, -190, -230, -210]
          }
        ]
      }
    };
  },
  mounted() {
    // 图表渲染
    let myChart = echarts.init(document.getElementById("charts"));
    myChart.setOption(this.chartsOption);
  },
  methods: {}
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


