const storage = require("electron-json-storage");

let _mainMenu = document.getElementById("mainmenu");

function menu_show() { _mainMenu.classList.remove("base-hide"); }
function menu_hide() { _mainMenu.classList.add("base-hide"); }

function show_dialog(d) { d.classList.add("overlay-show"); }
function hide_dialog(d) { d.classList.remove("overlay-show"); }

function format() {
	storage.clear();
	menu_show();
	format_hide();
}

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
