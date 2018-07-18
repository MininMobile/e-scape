let out = document.getElementById("output");
let inp = document.getElementById("inform");
let inf = document.getElementById("in");
let inl = document.getElementById("path");

let commands = {};
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

	if (Object.keys(commands).includes(args[0])) {
		commands[args[0]].Call("command", args);
	} else {
		output = `Invalid command "${args[0]}" specified.`;
	}

	switch (args[0]) {
		case "echo":
			args.shift();

			output = args.join(" ");
			break;

		case "newp":
			let id = 0;

			while (Object.keys(processes).includes(`${id}`)) {
				id = utilRINT(0, 255);
			}

			processes[id] = new Process();
			break;

		case "ps":
			Object.keys(processes).forEach((p) => {
				output += `${p} | ${processes[p].name} | ${processes[p].desc}</p><p>`;
			});

			output += `${Object.keys(processes).length} total`;
			break;

		case "kill":
			if (Object.keys(processes).includes(args[1])) {
				processes[args[1]].kill();
			} else {
				output = `kill: Invalid process id "${args[0]}" specified.`;
			}
			break;

		case "clear":
			out.innerHTML = "";
			break;
	}

	out.innerHTML += `<p>${output}</p><br/>`;

	scroll(0, window.innerHeight);

	return false;
}

class Process {
	constructor(p = -1, name = "null", desc = "null") {
		this.name = name;
		this.desc = desc;
	}
}

function utilRINT(min, max) {
	return Math.floor(Math.random() * max) + min;
}
