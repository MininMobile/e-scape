const storage = require("electron-json-storage");

let _mainMenu = document.getElementById("mainmenu");

function show_menu() { _mainMenu.classList.remove("base-hide"); }
function hide_menu() { _mainMenu.classList.add("base-hide"); }

function show_dialog(d) { d.classList.add("overlay-show"); }
function hide_dialog(d) { d.classList.remove("overlay-show"); }

function hidel_dialog(d) { d.classList.remove("overlay-show"); d.classList.add("base-hide"); }
function showl_dialog(d) { d.classList.add("overlay-show"); d.classList.remove("base-hide"); }

function format() {
	storage.clear();
	showl_dialog(d.settings);
	hide_dialog(d.format)
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
