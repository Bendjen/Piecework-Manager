import { saveAs } from 'file-saver/FileSaver';
import store from 'store'
import dayjs from 'dayjs'

// 导出localStorage表

export default function () {
    let PieceManagerLocaStorage = {
        'OPERATION_RECORD_LIST': store.get('OPERATION_RECORD_LIST') || [],
        'STOCK': store.get('STOCK') || {},
        'EXPORT_RECORD_LIST': store.get('EXPORT_RECORD_LIST') || [],
        'IMPORT_RECORD_LIST': store.get('IMPORT_RECORD_LIST') || [],
        'STAFF_PIECE_RECORD_LIST': store.get('STAFF_PIECE_RECORD_LIST') || {},
        'STAFF_LIST': store.get('STAFF_LIST') || [],
        'ITEM_TYPE_LIST': store.get('ITEM_TYPE_LIST') || [],
    }
    let file = new File([JSON.stringify(PieceManagerLocaStorage)], `${dayjs().format('导出数据YY-MM-DD')}.json`, { type: "json/plain;charset=utf-8" });
    saveAs(file);
}