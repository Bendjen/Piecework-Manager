import store from 'store'

// 读取JSON文件进localStorage

export default function (data) {
	store.set('OPERATION_RECORD_LIST',data['OPERATION_RECORD_LIST']);
	store.set('STOCK',data['STOCK']);
	store.set('EXPORT_RECORD_LIST',data['EXPORT_RECORD_LIST']);
	store.set('IMPORT_RECORD_LIST',data['IMPORT_RECORD_LIST']);
	store.set('STAFF_PIECE_RECORD_LIST',data['STAFF_PIECE_RECORD_LIST']);
	store.set('STAFF_LIST',data['STAFF_LIST']);
	store.set('ITEM_TYPE_LIST',data['ITEM_TYPE_LIST']);
}
