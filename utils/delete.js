import store from "store";
import { Toast } from "vant";
import { addListener } from "cluster";

export function type(name, callback) {
	let itemTypeList = store.get("ITEM_TYPE_LIST");
	let index = itemTypeList.findIndex(item => item.name == name);
	itemTypeList.splice(index, 1);
	store.set("ITEM_TYPE_LIST", itemTypeList);
	Toast.success({ message: "删除成功", duration: 1000 });
	callback && callback();
}

export function staff(name, callback) {
	let staffList = store.get("STAFF_LIST");
	let index = staffList.findIndex(item => item.name == name);
	staffList.splice(index, 1);
	store.set("STAFF_LIST", staffList);
	Toast.success({ message: "删除成功", duration: 1000 });
	callback && callback();
}

export function record(record, callback) {
	let operationRecord = store.get("OPERATION_RECORD_LIST");
	let index = operationRecord.findIndex(item => (item.time == record.time && item.staff == record.staff && item.num == record.num && item.type == record.type) );
	if (index == -1) {
		Toast.fail({ message: "删除失败", duration: 1000 });
	} else {
		operationRecord.splice(index, 1);
		store.set("OPERATION_RECORD_LIST", operationRecord);
		Toast.success({ message: "删除成功", duration: 1000 });
		operationRecord.reverse();
		callback && callback(operationRecord);
	}
}


