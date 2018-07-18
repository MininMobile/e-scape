const storage = require("electron-json-storage");

module.exports = exports = (type, scope) => {
	switch (type) {
		case "game":
			return storage.set("game_progress", scope, (err) => { if (err) return err; return "Success" });
			break;

		case "settings":
			return storage.set("game_settings", scope, (err) => { if (err) return err; return "Success" });
			break;

		default:
			throw new Error("Invalid save type");
	}
}
