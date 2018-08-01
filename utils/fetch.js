import store from "store";
import NP from "number-precision";
import { Toast } from "vant";
import dayjs from "dayjs";

export function itemTypeList() {
	let list = store.get("ITEM_TYPE_LIST").map(item => item.name);
	list.reverse()
	return list
}

export function staffList() {
	let list = store.get("STAFF_LIST").map(item => item.name);
	list.reverse()
	return list
}

export function operationRecord() {
	let list = store.get("OPERATION_RECORD_LIST") || [];
	list.reverse();
	return list;
}

// 过滤目标月下单记录
export function recordFilter({
	date = new Date(),
	unit = "month",
	action = "PIECE_RECORD"
}) {
	let list = store.get("OPERATION_RECORD_LIST");
	let targetMonthStart = dayjs(date).startOf(unit);
	let targetMonthEnd = dayjs(date).endOf(unit);
	return list.filter(item => {
		return (
			dayjs(item.time).isAfter(targetMonthStart) &&
			dayjs(item.time).isBefore(targetMonthEnd) &&
			item.action == action
		);
	});
}

// 记单汇总(员工)
export function staffSummary(date = new Date(), unit = "month") {
	// 数据初始化为0
	let staffSummary = {};
	let itemTypeList = store.get("ITEM_TYPE_LIST");
	store.get("STAFF_LIST").forEach(item => {
		staffSummary[item.name] = {};
		staffSummary[item.name]["detail"] = {};
		staffSummary[item.name]["record"] = [];
		staffSummary[item.name]["total"] = 0;
	});

	// 数据累加
	recordFilter({ date, unit, action: "PIECE_RECORD" }).forEach(item => {
		staffSummary[item.staff]["detail"][item.type] = NP.plus(
			staffSummary[item.staff][["detail"]][item.type] || 0,
			item.num
		);

		staffSummary[item.staff]["record"].push(item);

		let itemPrice = itemTypeList.find(_item => _item.name == item.type)
			.price;
		staffSummary[item.staff]["total"] = NP.plus(
			staffSummary[item.staff]["total"],
			NP.times(item.num, itemPrice)
		);
	});

	console.log(staffSummary);
	return staffSummary;
}

// 记单汇总（货物）
export function goodsSummary(date = new Date(), unit = "month") {
	// 数据初始化为0
	let goodsSummary = {};
	let itemTypeList = store.get("ITEM_TYPE_LIST");

	store.get("ITEM_TYPE_LIST").forEach(item => {
		goodsSummary[item.name] = {};
	});

	// 数据累加
	recordFilter({ date, unit, action: "PIECE_RECORD" }).forEach(item => {
		goodsSummary[item.type]["num"] = NP.plus(
			goodsSummary[item.type]["num"] || 0,
			item.num
		);

		let itemPrice = itemTypeList.find(_item => _item.name == item.type)
			.price;
		goodsSummary[item.type]["money"] = NP.plus(
			goodsSummary[item.type]["money"] || 0,
			NP.times(item.num, itemPrice)
		);
	});

	return goodsSummary;
}

// 出货汇总
export function exportSummary(date = new Date(), unit = "month") {
	// 数据初始化为0
	let exportSummary = {};
	let itemTypeList = store.get("ITEM_TYPE_LIST");

	store.get("ITEM_TYPE_LIST").forEach(item => {
		exportSummary[item.name] = 0;
	});

	// 数据累加
	recordFilter({ date, unit, action: "GOODS_EXPORT" }).forEach(item => {
		exportSummary[item.type] = NP.plus(
			exportSummary[item.type] || 0,
			item.num
		);
	});

	return exportSummary;
}
