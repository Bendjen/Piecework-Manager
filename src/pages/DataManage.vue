<template>
	<div class='dataManage' flex='dir:top main:justify'>
		<div style='height:48%' class='container'>
			<h1 flex='main:justify cross:center'>
				<span>员工管理</span>
				<i class='iconfont icon-add'  @click="addStaffVisible=true"></i>
			</h1>
			<ul>
				<li v-for='item in staffList' :key='item' flex='main:justify'>
					<span>{{item}}</span>
					<van-icon name="delete"  @click='deleteStaff(item)'/>
				</li>
			</ul>
		</div>
		<div style='height:48%' class='container'>
			<h1 flex='main:justify cross:center'>
				<span>型号管理</span>
				<i class='iconfont icon-add' @click="addTypeVisible=true"></i>
			</h1>
			<ul>
				<li v-for='item in itemTypeList' :key='item.name' flex='main:justify'>
					<p><span>{{item.name}}</span> <span style='font-size:12px;color:#c9c9c9;'>- {{item.price}}元 / 件</span> </p>
					<van-icon name="delete"  @click='deleteType(item.name)'/>
				</li>
			</ul>
		</div>

		<!-- 添加型号 -->
          <van-popup v-model="addTypeVisible" style='width:80%;background: #f3f3f3;' class='popup'>
              <div style='width:100%;height:100%;'>
				  <h1 style='height:1.2rem;margin-bottom:0.6rem' class='dialogTitle'  flex='main:center cross:center'>添加型号</h1>
                  <div style='' flex='dir:top cross:center main:center'>
                        <p flex='main:center cross:center'>
                            <span style='padding-right:.4rem;display:inline-block;width:2.5rem;text-align:center' >名称：</span>
                            <input placeholder="输入型号" type="text" v-model.trim = "newType.name"  @focus="$event.target.select()" style='height:1rem;text-align:center'>
                        </p>
                        <p flex='main:center cross:center' style='margin:.4rem 0;'>
                            <span style='padding-right:.4rem;display:inline-block;width:2.5rem;text-align:center' >单价（元）：</span>
                            <input type="number" v-model.number = "newType.price"  @focus="$event.target.select()" style='height:1rem;text-align:center'>
                        </p>
                  </div>
                  <div style='height:2rem;padding:0 10%;' flex='main:justify cross:center'>
                        <van-button type="default"  style='width:40%' @click='addTypeVisible = false'>取消</van-button>
                        <van-button type="primary" style='width:40%' @click='addTypeConfirm'>确定</van-button>
                  </div>
              </div>
          </van-popup>

		    <!-- 添加员工 -->
          <van-popup v-model="addStaffVisible" style='width:80%;background: #f3f3f3;' class='popup'>
              <div style='width:100%;height:100%'>
				  <h1 style='height:1.2rem;margin-bottom:0.6rem' class='dialogTitle'  flex='main:center cross:center'>添加员工</h1>
                  <div style='' flex='dir:top cross:center main:center'>
                        <p flex='main:center cross:center'>
                            <span style='padding-right:.4rem'>姓名：</span>
                            <input type="text" v-model.trim = "newStaff.name" style='height:1rem;text-align:center'  @focus="$event.target.select()">
                        </p>
                  </div>
                  <div style='height:2rem;padding:0 10%;' flex='main:justify cross:center'>
                        <van-button type="default"  style='width:40%' @click='addStaffVisible = false'>取消</van-button>
                        <van-button type="primary" style='width:40%' @click='addStaffConfirm'>确定</van-button>
                  </div>
              </div>
          </van-popup>

    </div>
</template>

<script>
import { Toast, Icon, Popup, Button, Dialog } from "vant";

import * as Fetch from "../../utils/fetch";
import * as Delete from "../../utils/delete";
import TypeAdd from "../../utils/typeAdd";
import StaffAdd from "../../utils/staffAdd";

export default {
  components: {
    vanIcon: Icon,
    VanPopup: Popup,
    VanPopup: Popup,
    VanButton: Button
  },
  data() {
    return {
      addTypeVisible: false,
      addStaffVisible: false,
      newStaff: { name: "" },
      newType: { name: "", price: 0 },
      staffList: Fetch.staffList(),
      itemTypeList: Fetch.itemTypeList()
    };
  },
  mounted() {
    //console.log(this.itemTypeList);
  },
  methods: {
    deleteStaff(name) {
      let vm = this;
      Dialog.confirm({
        title: "提示",
        message: `确定要删除员工“${name}”吗？`
      })
        .then(() => {
          Delete.staff(name, () => {
            vm.staffList = Fetch.staffList();
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    deleteType(name) {
      let vm = this;
      Dialog.confirm({
        title: "提示",
        message: `删除型号可能会导致之前汇总信息无法查询到型号价格，确定要删除型号“${name}”吗？`
      })
        .then(() => {
          Delete.type(name, () => {
            vm.itemTypeList = Fetch.itemTypeList();
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    addStaffConfirm() {
      let vm = this;
      if (!this.newStaff.name) {
        Toast.fail("姓名不能为空");
      } else {
        StaffAdd(
          { name: this.newStaff.name, time: new Date().getTime() },
          () => {
            vm.addStaffVisible = false;
            vm.newStaff = { name: "" };
            vm.staffList = Fetch.staffList();
          }
        );
      }
    },
    addTypeConfirm() {
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
            vm.addTypeVisible = false;
            vm.newType = { name: "", price: 0 };
            vm.itemTypeList = Fetch.itemTypeList();
          }
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.popup {
  input {
    height: 1rem;
  }
}
.dataManage {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  .container {
    h1 {
      background: #e5e5e5;
      padding: 0.3rem;
      border: 1px solid #e5e5e5;
      height: 20%;
    }
    ul {
      height: 80%;
      margin: 0 0.2rem;
      overflow-y: auto;
      li {
        background: #fff;
        padding: 0.3rem;
        border: 1px solid #dbdbdb;
        border-top: none;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
          0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
        i {
          color: red;
        }
      }
    }
  }
}
.dialogTitle {
  background: #fff;
  font-size: 18px;
  font-weight: normal;
}
</style>


