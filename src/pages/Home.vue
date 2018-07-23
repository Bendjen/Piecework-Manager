<template>
      <div style='height:100%; width:100%;'>
          <div class='summary' id='charts'> </div>
          <div class='quickList' flex='dir:top main:center'>
              <ul flex='main:center cross:center'>
                  <li v-for="item in list1" :key="item.title" @click="item.onClick" flex="dir:top main:center cross:center">
                      <div class='icon' flex='main:center cross:center'><i class='iconfont' :class="item.icon"></i></div>   
                      <span>{{item.title}}</span>
                  </li>
              </ul>
              <ul flex='main:center cross:center'>
                  <li v-for="item in list2"  :key="item.title" @click='item.onClick' flex="dir:top main:center cross:center">
                      <div class='icon' flex='main:center cross:center'><i class='iconfont' :class="item.icon"></i></div>   
                      <span>{{item.title}}</span>
                  </li>
              </ul>
          </div>
          <div class='operationRecords'>
              <!-- <h1 style='height:10%' flex='cross:center'>操作记录</h1> -->
              <ul>
                  <li flex='main:justify cross:center'>
                      <div flex='dir:top'>
                          <h4>添加员工</h4>
                          <p>&nbsp;</p>
                          <p class='time'>今天 15:12:12</p>
                      </div>
                      <div class='content'>张璐群</div>
                  </li>
                  <li flex='main:justify cross:center'>
                      <div flex='dir:top'>
                          <h4>进货</h4>
                          <p class='type'>[A4516]</p>
                          <p class='name'>今天 15:12:12</p>
                      </div>
                      <div class='content'>+50000</div>
                  </li>
                  <li flex='main:justify cross:center'>
                      <div flex='dir:top'>
                          <h4>进货</h4>
                          <p class='type'>[A4516]</p>
                          <p class='name'>今天 15:12:12</p>
                      </div>
                      <div class='content'>+50000</div>
                  </li>
              </ul>
          </div>
      </div>
</template>

<script>

let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

import { Dialog } from 'vant';

export default {
    data () {
        let that = this;
        return {
            list1: [
                { title: '进货', icon: 'icon-import', onClick: this.onClick },
                { title: '出货', icon: 'icon-export', onClick: this.onClick },
                { title: '员工计单', icon: 'icon-records', onClick: this.onClick },
                { title: '工资结算', icon: 'icon-salery', onClick: this.onClick },
            ],
            list2: [
                { title: '员工管理', icon: 'icon-manager-add', onClick: this.onClick },
                { title: '库存管理', icon: 'icon-version-add', onClick: this.onClick },
                { title: '读取数据', icon: 'icon-file-load', onClick: this.onClick },
                { title: '导出数据', icon: 'icon-file-save', onClick: this.onClick },
            ],
            option: {
                title: {
                    text: '当月出货分布',
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
    mounted () {
        let myChart = echarts.init(document.getElementById('charts'));
        myChart.setOption(this.option);
        // let input = document.getElementById("file");
        // input.onchange = function(){
        //     let file = this.files[0];
        //     if(!!file){
        //         let reader = new FileReader();
        //         reader.readAsBinaryString(file);
        //         reader.onload = function(){
        //             console.log(JSON.parse(this.result))
        //         }
        //     }
        // }
    },
    methods: {
        onClick () {
            Dialog.alert({
                title: '标题',
                message: '弹窗内容'
            }).then(() => {
                // on close
            });
        }
    }
};
</script>

<style lang="scss">
.summary {
  width: 100%;
  height: 35%;
  box-sizing: border-box;
  overflow: hidden;
}
.quickList {
  height: 25%;
  box-sizing: border-box;
  overflow: hidden;
  background: #c39a9a;
  ul {
    li {
      display: inline-block;
      width: 30%;
      height: 1.8rem;
      padding: 0.1rem 0;
      color: #fff;
      &:active {
        transition: all 0.1s;
        box-sizing: border-box;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.14),
          2px 2px 2px 2px rgba(0, 0, 0, 0.12),
          2px 2px 2px -2px rgba(0, 0, 0, 0.2);
      }
      .icon {
        width: 100%;
        height: 70%;
      }
      i {
        font-size: 26px;
        color: #fff;
      }
    }
  }
}
.operationRecords {
  box-sizing: border-box;
  overflow-x: hidden;
  height: 45%;
  width: 100%;
  h1 {
    color: black;
    padding: 0.2rem 0.4rem;
    font-weight: normal;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    background: #fff;
  }
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
      h4 {
        padding: 0.1rem 0;
        font-size: 14px;
      }
      p {
        padding: 0.1rem 0;
      }
      .content {
        font-size: 18px;
      }
    }
  }
}
</style>


