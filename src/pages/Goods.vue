<template>
	<div class='goods'>
		<i class='iconfont icon-add' @click="addPopVisible=true" style='position:fixed;top:.4rem;right:.4rem'></i>
		<div style='height:100%'>
			<div id='charts' style='width:100%;height:100%'></div>
		</div>

		  <!-- 添加型号 -->
          <van-popup v-model="addPopVisible" style='width:80%;height:32%;background: #f3f3f3;' class='popup'>
              <div style='width:100%;height:100%;'>
				  <h1 style='height:20%' class='dialogTitle'  flex='main:center cross:center'>添加型号</h1>
                  <div style='height:55%;' flex='dir:top cross:center main:center'>
                        <p flex='main:center cross:center'>
                            <span style='padding-right:.4rem'>名称：</span>
                            <input type="text" v-model.trim = "newType.name"  @focus="$event.target.select()" style='height:.8rem;text-align:center'>
                        </p>
                        <p flex='main:center cross:center' style='margin:.4rem 0;'>
                            <span style='padding-right:.4rem' >单价：</span>
                            <input type="text" v-model.number = "newType.price"  @focus="$event.target.select()" style='height:.8rem;text-align:center'>
                        </p>
                  </div>
                  <div style='height:20%;padding:0 10%;' flex='main:justify cross:center'>
                        <van-button type="default"  style='width:40%' @click='addPopVisible = false'>取消</van-button>
                        <van-button type="primary" style='width:40%' @click='addTypeConfirm'>确定</van-button>
                  </div>
              </div>
          </van-popup>
    </div>

</template>

<script>
import { Toast, Popup, Button } from "vant";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/bar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
// require('echarts/lib/component/legend');

import TypeAdd from "../../utils/typeAdd";


export default {
    components: {
        VanPopup: Popup,
        VanButton: Button
    },
    data () {
        return {
            addPopVisible: false,
            newType: { name: "", price: 0 },
            chartsOption: {
                title: {
                    text: "2018年7月",
                    subtext: "纯属虚构",
                    x: "center"
                },
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
    mounted () {
        Toast.loading("加载中...");
        setTimeout(() => {
            Toast.clear();
            // 图表渲染
            let myChart = echarts.init(document.getElementById("charts"));
            myChart.setOption(this.chartsOption);
        }, 500);
    },
    methods: {
        addTypeConfirm () {
            let vm = this;
            if (!this.newType.name) {
                Toast.fail("名称不能为空");
            } else if (!this.newType.price) {
                Toast.fail("单格不能为0");
            } else {
                TypeAdd(
                    {
                        name: this.newType.name,
                        price: this.newType.price,
                        time: new Date().getTime()
                    },
                    () => {
                        vm.addPopVisible = false;
                    }
                );
            }
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


