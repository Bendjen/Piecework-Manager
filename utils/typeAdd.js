import store from "store";
import NP from "number-precision";
import { Toast } from "vant";
import onfire from "onfire.js";

// 增加型号
// @name : 名称
// @price : 单价
// @time : 时间

export default function ({ name, price, time }, callback) {
    // 添加操作记录
    let operationRecorddList = store.get("OPERATION_RECORD_LIST") || [];
    let newOperationRecord = {
        name,
        time,
        price,
        action: "TYPE_ADD",
        actionName: "新增型号"
    };
    store.set("OPERATION_RECORD_LIST", [
        ...operationRecorddList,
        newOperationRecord
    ]);
    onfire.fire("add_operation_record", newOperationRecord);

    // 更新类型列表
    let itemTypeList = store.get("ITEM_TYPE_LIST") || [];
    let newType = { name, time, price };

    if (!!itemTypeList.find(item => item.name == name)) {
        Toast.fail("添加失败，已存在同名型号");
        return false;
    } else {
        store.set("ITEM_TYPE_LIST", [...itemTypeList, newType]);
    }

    // 更新库存列表
    let stock = store.get("STOCK") || {};
    stock[name] = [];
    store.set("STOCK", stock);

    Toast.success("添加成功");
    callback && callback();
}
