const storage = require("electron-json-storage");

module.exports = exports = (type) => {
	switch (type) {
		case "game":
			return storage.get("game_progress", (err, data) => { if (err) return err; return data });
			break;

		case "settings":
			return storage.get("game_settings", (err, data) => { if (err) return err; return data });
			break;

		default:
			throw new Error("Invalid save type");
	}
}
