const storage = require("electron-json-storage");
const { dialog } = require('electron').remote;

let _mainMenu = document.getElementById("mainmenu");
let _formatDialog = document.getElementById("dialog_format");

function menu_show() { _mainMenu.classList.remove("base-hide"); }
function menu_hide() { _mainMenu.classList.add("base-hide"); }

function format_show() { _formatDialog.classList.add("overlay-show"); }
function format_hide() { _formatDialog.classList.remove("overlay-show"); }

function format() {
	storage.clear();
	menu_show();
	format_hide();
}

function back() {
	window.location = "../menu/menu.html";
}

function utilALERT(text) {
	dialog.showMessageBox({
		type: "none",
		buttons: ["Dissmiss"],
		title: "e SCAPe",
		message: text
	});
}
