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

	let args = inf.value.split(" "); if (args[0]) args[0] = args[0].toLowerCase();
	let output = "";

	out.innerHTML += `<p>${inl.innerText} ${inf.value}</p>`;

	inf.value = "";

	if (Object.keys(commands).includes(args[0])) {
		output = commands[args[0]].Call("command", args);
	} else {
		output = `Invalid command "${args[0]}" specified.`;
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

class Command {
	constructor(action = (args) => {}, desc = "null") {
		this.desc = desc;

		this.ev = {};
		this.ev.command = action;
	}

	Call(event, scope) {
		switch (event) {
			case "command":
				return this.ev.command(scope);
				break;

			default:
				// error
		}
	}
}

commands.help = new Command((args) => {
	if (args[1]) {
		if (Object.keys(commands).includes(args[1])) {
			return `${args[1]}: ${commands[args[1]].desc}`;
		} else {
			return `help: Invalid command "${args[1]}" specified.`;
		}
	}

	return Object.keys(commands).join("</p><p>");
}, "List commands or display help for a command");

commands.echo = new Command((args) => {
	args.shift();
	return args.join(" ");
}, "Prints user specified text to output");

commands.newp = new Command((args) => {
	let id = 0;

	while (Object.keys(processes).includes(`${id}`))
		id = utilRINT(0, 255);

	processes[id] = new Process();

	return "";
}, "Creates a new dummy process"); 

commands.kill = new Command((args) => {
	if (Object.keys(processes).includes(args[1])) {
		delete processes[args[1]];
		return "";
	}

	return `kill: Invalid process id "${args[1]}" specified.`;
}, "Kills a process");

commands.ps = new Command((args) => {
	let output = "";

	Object.keys(processes).forEach((p) => {
		output += `${p} | ${processes[p].name} | ${processes[p].desc}</p><p>`;
	});

	output += `${Object.keys(processes).length} total`;

	return output;
}, "List active processes");

commands.clear = new Command((args) => {
	out.innerHTML = "";
}, "Clears output");

commands.save = new Command((args) => {
	return save();
}, "Save game");

commands.exit = new Command((args) => {
	save();
	window.location = "../menu/menu.html";
	return "";
}, "Save and go back to the main menu");

function save() {
	// save game progress
}

function utilRINT(min, max) {
	return Math.floor(Math.random() * max) + min;
}
