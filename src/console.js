let out = document.getElementById("output");
let inp = document.getElementById("inform");
let inf = document.getElementById("in");
let inl = document.getElementById("path");

let processes = {};
let chistory = [];
let historyi = -1;

document.onclick = (e) => inf.focus();

document.onkeydown = (e) => {
	if (historyi == -1)  historyi = chistory.length;

	if (e.keyCode == 38) {
		historyi--;
		
		if (chistory[historyi] != undefined) {
			inf.value = chistory[historyi];
		} else {
			historyi = -1;
			inf.value = "";
		}
	} else if (e.keyCode == 40) {
		historyi++;
		
		if (chistory[historyi] != undefined) {
			inf.value = chistory[historyi];
		} else {
			historyi = -1;
			inf.value = "";
		}
	}
}

inp.onsubmit = (e) => {
	chistory.push(inf.value);
	historyi = -1;

	let args = inf.value.split(" ");
	let output = "";

	out.innerHTML += `<p>${inl.innerText} ${inf.value}</p>`;

	inf.value = "";

	switch (args[0]) {
		case "echo":
			args.shift();

			output = args.join(" ");
			break;

		case "ps":
			Object.keys(processes).forEach((process) => {
				output += `${process} | ${processes[process].name} | ${processes[process].description}</p><p>`;
			});

			output += `${Object.keys(processes).length} total`;
			break;

		default:
			output = `Invalid command "${args[0]}" specified.`;
	}

	out.innerHTML += `<p>${output}</p><br/>`;

	return false;
}
