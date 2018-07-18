const storage = require("electron-json-storage");

module.exports = exports = (type, scope) => {
	switch (type) {
		case "game":
			storage.set("game_progress", scope, console.error);
			break;

		case "settings":
			storage.set("game_settings", scope, console.error);
			break;

		default:
			throw new Error("Invalid save type");
	}
}
