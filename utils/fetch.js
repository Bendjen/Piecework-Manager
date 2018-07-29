import store from "store";
import NP from "number-precision";
import { Toast } from "vant";
import dayjs from "dayjs";

export function itemTypeList() {
	return store.get("ITEM_TYPE_LIST").map(item => item.name);
}

export function staffList() {
	return store.get("STAFF_LIST").map(item => item.name);
}

export function operationRecord() {
	let list = store.get("OPERATION_RECORD_LIST");
	list.reverse()
	return list;
}

// export function monthSummary(date) {
// 	let list = store.get("OPERATION_RECORD_LIST");
// 	let summary = []
// 	list.filter(item=>{
// 		if()
// 	})
// }

