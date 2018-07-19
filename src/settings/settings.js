const storage = require("electron-json-storage");
const { dialog } = require('electron').remote;

function reset() {
	dialog.showMessageBox({
		type: "warning",
		buttons: ["Ok", "Cancel"],
		title: "e SCAPe",
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
		type: "none",
		buttons: ["Dissmiss"],
		title: "e SCAPe",
		message: text
	});
}
