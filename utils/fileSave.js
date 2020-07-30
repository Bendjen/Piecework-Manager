import { saveAs } from "file-saver/FileSaver";
import store from "store";
import dayjs from "dayjs";
import { Toast, Dialog } from "vant";
// 导出localStorage表

export default function() {
	let PieceManagerLocaStorage = {
		OPERATION_RECORD_LIST: store.get("OPERATION_RECORD_LIST") || [],
		// 'STOCK': store.get('STOCK') || {},
		// 'EXPORT_RECORD_LIST': store.get('EXPORT_RECORD_LIST') || [],
		// 'IMPORT_RECORD_LIST': store.get('IMPORT_RECORD_LIST') || [],
		// 'STAFF_PIECE_RECORD_LIST': store.get('STAFF_PIECE_RECORD_LIST') || {},
		STAFF_LIST: store.get("STAFF_LIST") || [],
		ITEM_TYPE_LIST: store.get("ITEM_TYPE_LIST") || []
	};
	if (window.$apicloud) {
		console.log("exportData");
		window.$apicloud.writeFile(
			{
				path: `${window.$apicloud.cacheDir}/${dayjs().format(
					"导出数据YY-MM-DD"
				)}.json`,
				data: JSON.stringify(PieceManagerLocaStorage)
			},
			(ret, err) => {
				if (ret.status) {
					Dialog.alert({
						title: "数据已导出",
						message: `${window.$apicloud.cacheDir}/${dayjs().format(
							"导出数据YY-MM-DD"
						)}.json`
					});
				} else {
					Dialog.alert({
						title: "错误",
						message: err.msg || "导出过程出错"
					});
				}
			}
		);
	} else {
		let file = new File(
			[JSON.stringify(PieceManagerLocaStorage)],
			`${dayjs().format("导出数据YY-MM-DD")}.json`,
			{ type: "json/plain;charset=utf-8" }
		);
		saveAs(file);
	}
}
