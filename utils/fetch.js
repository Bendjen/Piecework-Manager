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
	let list = store.get("OPERATION_RECORD_LIST") || [];
	list.reverse();
	return list;
}

// 目标月记单记录
export function targetMonthPieceRecord(date) {
	let list = store.get("OPERATION_RECORD_LIST");
	let targetMonthStart = dayjs(date).startOf("month");
	let targetMonthEnd = dayjs(date).endOf("month");
	return list.filter(item => {
		return (
			dayjs(item.time).isAfter(targetMonthStart) &&
			dayjs(item.time).isBefore(targetMonthEnd) &&
			item.action == "PIECE_RECORD"
		);
	});
}

// 目标日记单记录
export function targetDayPieceRecord(date) {
	let list = store.get("OPERATION_RECORD_LIST");
	let targetDaytart = dayjs(date).startOf("day");
	let targetDayEnd = dayjs(date).endOf("day");
	return list.filter(item => {
		return (
			dayjs(item.time).isAfter(targetDaytart) &&
			dayjs(item.time).isBefore(targetDayEnd) &&
			item.action == "PIECE_RECORD"
		);
	});
}

// 目标月员工记单汇总
export function targerMonthStaffSummary(date) {
	// 数据初始化为0
	let staffSummary = {};
	store.get("STAFF_LIST").forEach(item => {
		staffSummary[item.name] = {};
	});

	// 数据累加
	targetMonthPieceRecord(date).forEach(item => {
		staffSummary[item.staff][item.type] = NP.plus(
			staffSummary[item.staff][item.type] || 0,
			item.num
		);
	});

	return staffSummary;
}

// 目标月货物记单汇总
export function targerMonthGoodsSummary(date) {
	// 数据初始化为0
	let goodsSummary = {};
	store.get("ITEM_TYPE_LIST").forEach(item => {
		goodsSummary[item.name] = 0;
	});

	// 数据累加
	targetMonthPieceRecord(date).forEach(item => {
		goodsSummary[item.type] = NP.plus(
			goodsSummary[item.type] || 0,
			item.num
		);
	});

	return goodsSummary;
}
