import NP from "number-precision";

export default function toyun(Vue) {
	Vue.filter("toYuan", val => {
		let result = 0;
		try {
			result = NP.times(val, 10000);
		} catch (err) {}
		return result
	});
}
