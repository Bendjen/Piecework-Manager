<template>
    <div class='staffManageContainer'>
        <!-- <div class='toolBar' flex='main:justify' style='height:6%'>
            <i class='iconfont icon-back' @click="$router.push('/home')"></i>
            <i class='iconfont icon-add' @click="addPopVisible=true"></i>
        </div> -->
        <div class='staffDetail' style='height:100%;'>
            <van-swipe style='height:100%;' :loop='false' >
                <van-swipe-item>
                    <div style='height:100%;width:100%;' class='staffDetail'  v-if='show'>
                        <div style='height:60%;'>
                            <h1 flex='main:justify cross:center' style="height:7%">
                                <span style='font-size:16px'>张立群</span>
                                <div flex='main:right cross:center'  class='bar'>
                                    <div @click='$refs.monthPicker.toggle()'>
                                        <i class='iconfont icon-calendar'></i>
                                        <span>{{monthName}}</span>
                                    </div>
                                </div>
                            </h1>
                           <div id="charts" style="width:9rem;height:85%;"></div>
                        </div>
                        <div class='operationRecords' style="height:40%">
                            <h1 style='height:10%' flex='cross:center'>当月记单</h1>
                            <ul style='height:90%'>
                                <li v-if="recordList.length == 0"> <div>暂无任何操作记录</div></li>
                                <li flex='main:justify cross:center'  v-for='item in recordList' :key='item.time'>
                                    <div flex='dir:top'>
                                        <h4>{{item.type}}</h4>
                                        <p class='time'  style='color:#6a788c'>{{item.time | toTime}}</p>
                                    </div>
                                    <div class='content'  style='color:#38f;'> +{{item.num}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </van-swipe-item>
            </van-swipe>
        </div>


         <i class='iconfont icon-last' @click="lastMonth"></i>
         <i class='iconfont icon-next' @click="nextMonth"></i>


        <month-picker ref='monthPicker' @change='monthChoose'></month-picker>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
import dayjs from 'dayjs'

import { Popup, Button, Toast, Swipe, SwipeItem } from 'vant'

import MonthPicker from "../components/monthPicker"





export default {
    components: {
        'VanPopup': Popup,
        'VanButton': Button,
        'VanSwipe': Swipe,
        'VanSwipeItem': SwipeItem,
        'MonthPicker': MonthPicker,
    },
    data () {
        return {
            chooseMonth: new Date(),
            addPopVisible: false,
            show: true,
            recordList: [
                { type: "A123", staff: '张璐群', num: 100, time: new Date().getTime(), actionName: '员工计件', action: 'PIECE_RECORD' },
                { type: "A123", staff: '张璐群', num: 100, time: new Date().getTime(), actionName: '员工计件', action: 'PIECE_RECORD' },
                { type: "A123", staff: '张璐群', num: 100, time: new Date().getTime(), actionName: '员工计件', action: 'PIECE_RECORD' },
            ],
            chartsOption: {
                title: {
                    text: '当月统计',
                    subtext: '纯属虚构',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: 335, name: '直接访问' },
                            { value: 310, name: '邮件营销' },
                            { value: 234, name: '联盟广告' },
                            { value: 135, name: '视频广告' },
                            { value: 1548, name: '搜索引擎' }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        }
    },
    computed: {
        monthName: function () {
            return dayjs(this.chooseMonth).format('YYYY-MM')
        }
    },
    mounted () {
    },
    methods: {
        lastMonth () {
            let myChart = echarts.init(document.getElementById('charts'));
            myChart.setOption(this.chartsOption);
        },
        nextMonth () {

        },
        monthChoose (month) {
            this.chooseMonth = month
        }
    }
};
</script>

<style lang="scss" scoped>
.staffManageContainer {
  padding: 0.4rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .staffDetail {
    // border-radius: 0.4rem;
    background: #e2e2e2;
    color: #8e7777;
    width: 100%;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    h1 {
      box-sizing: content-box;
      color: #fff;
      background: #967171;
      font-size: 16px;
      font-weight: normal;
      padding: 0.2rem 0.4rem;
      font-weight: normal;
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
    }
    .bar {
      padding: 0 0.3rem;
    }
  }
  .toolBar {
    width: 100%;
    height: 6%;
  }
}
.popup {
  .dialogTitle {
    background: #fff;
    font-size: 20px;
  }
  p {
    padding: 0.3rem;
    font-size: 20px;
    span {
      font-size: 18px;
      margin-right: 0.5rem;
      color: #000;
    }
    input {
      border: 1px #c9c9c9 solid;
      border-radius: 2px;
      color: #000;
      text-align: center;
      font-weight: lighter;
      font-size: 16px;
      padding: 0.1rem 0.4rem;
    }
  }
}

.operationRecords {
  box-sizing: border-box;
  overflow-x: hidden;
  height: 40%;
  width: 100%;
  ul {
    height: 100%;
    overflow-y: auto;
    li {
      box-sizing: border-box;
      border: 1px solid #dbdbdb;
      border-top: none;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
      padding: 0.4rem;
      margin: 0.1rem;
      background: #fff;
      h4 {
        padding: 0.1rem 0;
        font-size: 14px;
      }
      p {
        padding: 0.1rem 0;
      }
      .content,
      .content span {
        font-size: 24px;
      }
    }
  }
}

.icon-last {
  position: fixed;
  left: 0.2rem;
  top: 50%;
  font-size: 26px;
  color: #888888;
}
.icon-next {
  position: fixed;
  right: 0.2rem;
  top: 50%;
  font-size: 26px;
  color: #888888;
}
</style>


