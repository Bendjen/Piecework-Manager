<template>
	<div class='staffList'>
        <div class='toolBar' flex='main:justify' style='height:6%'>
            <i class='iconfont icon-back' @click="$router.push('/home')"></i>
            <i class='iconfont icon-add' @click="addPopVisible=true"></i>
        </div>
        <div style='height:40%' class='summary'>
            <h1 style='height:20%'>员工当月详情</h1>
            <ul style='height:60%'>
                <li flex='main:justify'>
                    <span>A153</span>
                    <span>*1500</span>
                    <span>500元</span>
                </li>
                <li flex='main:justify'>
                    <span>A153</span>
                    <span>*1500</span>
                    <span>500元</span>
                </li>
                <li flex='main:justify'>
                    <span>A153</span>
                    <span>*1500</span>
                    <span>500元</span>
                </li>
                <li flex='main:justify'>
                    <span>A153</span>
                    <span>*1500</span>
                    <span>500元</span>
                </li>
                <li flex='main:justify'>
                    <span>A153</span>
                    <span>*1500</span>
                    <span>500元</span>
                </li>
                <li flex='main:justify'>
                    <span>A153</span>
                    <span>*1500</span>
                    <span>500元</span>
                </li>
                <li flex='main:justify'>
                    <span>A153</span>
                    <span>*1500</span>
                    <span>500元</span>
                </li>
            </ul>
            <div style='height:20%;' class='total'  flex='main:justify cross:center'>
                <span>合计</span>
                <span>25000</span>
                <span>50000</span>
            </div>
        </div>
        <div class='staffs' style='height:54%'>     
            <h1 style='height:10%' flex='cross:center'>当月记单</h1>
            <ul style='height:90%'>
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
</template>

<script>
import { CollapseItem } from 'vant';

export default {
    components: {
        'VanCollapseItem': CollapseItem,
    },
    data () {
        return {
            recordList: [
                { type: "A123", staff: '张璐群', num: 100, time: new Date().getTime(), actionName: '员工计件', action: 'PIECE_RECORD' },
                { type: "A123", staff: '张璐群', num: 100, time: new Date().getTime(), actionName: '员工计件', action: 'PIECE_RECORD' },
                { type: "A123", staff: '张璐群', num: 100, time: new Date().getTime(), actionName: '员工计件', action: 'PIECE_RECORD' },
                { type: "A123", staff: '张璐群', num: 100, time: new Date().getTime(), actionName: '员工计件', action: 'PIECE_RECORD' },
                { type: "A123", staff: '张璐群', num: 100, time: new Date().getTime(), actionName: '员工计件', action: 'PIECE_RECORD' },
                { type: "A123", staff: '张璐群', num: 100, time: new Date().getTime(), actionName: '员工计件', action: 'PIECE_RECORD' },
            ],
        }
    },
    mounted () {
    },
    methods: {

    }
};
</script>

<style lang="scss" scoped>
.staffList {
  padding: 0.4rem;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.summary {
  box-sizing: border-box;
  background: #efd3b5;
  color: #336933;
  ul {
    overflow-y: auto;
  }
  h1 {
    padding: 0.4rem 0;
    text-align: center;
    font-size: 18px;
  }
  li {
    padding: 0.15rem 1.2rem;
    color: #7e9092;
  }
  .total {
    padding: 0.15rem 1.2rem;
    color: #336933;
    span {
      font-weight: bold;
      font-size: 18px;
    }
  }
}

.staffs {
  box-sizing: border-box;
  overflow-x: hidden;
  height: 40%;
  width: 100%;
  h1 {
    margin-top: 0.5rem;
    box-sizing: content-box;
    color: #fff;
    background: #967171;
    font-size: 16px;
    font-weight: normal;
    padding: 0.2rem 0.2rem;
    font-weight: normal;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
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
</style>


