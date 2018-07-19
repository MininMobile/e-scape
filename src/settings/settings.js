const storage = require("electron-json-storage");
const {dialog} = require('electron').remote;

function reset() {
	dialog.showMessageBox({
		type: "error",
		buttons: ["Ok", "Cancel"],
		message: "PRESSING OK WILL DELETE ALL SAVED DATA"
	}, (i) => {
		if (i == 0) {
			storage.clear();
			utilALERT("Saves Wiped");
		} else {
			utilALERT("Action Cancelled");
		}
	});
}

function back() {
	window.location = "../menu/menu.html";
}

function utilALERT(text) {
	dialog.showMessageBox({
		type: "info",
		buttons: ["Dissmiss"],
		message: text
	}, (i) => { });
}
