import store from "store";
import onfire from 'onfire.js';

// 导出localStorage表

export default function() {
	if (
		!store.get("OPERATION_RECORD_LIST") &&
		!store.get("STAFF_LIST") &&
		!store.get("ITEM_TYPE_LIST")
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
}
