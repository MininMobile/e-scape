const storage = require("electron-json-storage");
const { dialog } = require('electron').remote;

let _formatDialog = document.getElementById("dialog_format")

function format_show() { _formatDialog.classList.add("overlay-show"); }
function format_hide() { _formatDialog.classList.remove("overlay-show"); }

function format() {
	storage.clear();
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
