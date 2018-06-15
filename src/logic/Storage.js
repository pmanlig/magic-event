export class Storage {
	static getItem(key) {
		let value = window.localStorage.getItem(key);
		if (value) {
			return JSON.parse(value);
		}
		return value;
	}

	static setItem(key, val) {
		window.localStorage.setItem(key, JSON.stringify(val));
	}
}