import store from "store";
import onfire from 'onfire.js';
import Mock from './mock'
import { Dialog } from 'vant'
// 导出localStorage表

export default function () {
	const operationRecordList = store.get("OPERATION_RECORD_LIST")
	const staffList = store.get("STAFF_LIST")
	const itemTypeList = store.get("ITEM_TYPE_LIST")
	if (
		!operationRecordList &&
		!staffList &&
		!itemTypeList
	) {
		const initData = [
			{ name: "OPERATION_RECORD_LIST", value: [] },
			// { name: 'STOCK', value: {} },
			// { name: 'EXPORT_RECORD_LIST', value: [] },
			// { name: 'IMPORT_RECORD_LIST', value: [] },
			// { name:'STAFF_PIECE_RECORD_LIST', value: {} },
			{ name: "STAFF_LIST", value: [] },
			{ name: "ITEM_TYPE_LIST", value: [] }
		];
		initData.forEach(item => {
			if (!store.get(item.name)) {
				store.set(item.name, item.value);
			}
		});
		onfire.fire("reload");
	}
	if (operationRecordList.length == 0 && staffList.length == 0 && itemTypeList.length == 0) {
		Dialog.confirm({
			title: "提示",
			message: "当前没有可展示数据，是否为您随机生成模拟数据？"
		})
			.then(() => {
				Mock()
			})
			.catch(() => {

			});
	}
}
