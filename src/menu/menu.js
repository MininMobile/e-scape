const storage = require("electron-json-storage");

function play() {
	storage.has("game_progress", (err, key) => {
		if (err) return console.error(err);
	
		if (key) {
			window.location = "../game/console.html";
		} else {
			window.location = "../game/intro.html";
		}
	});
}

function settings() {
	window.location = "../settings/settings.html";
}

function exit() {
	window.close();
}
