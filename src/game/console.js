const storage = require("electron-json-storage");

let out = document.getElementById("output");
let inp = document.getElementById("inform");
let inf = document.getElementById("in");
let inl = document.getElementById("path");

hdd = require("./hdd.json");
let loc = ["root"];
let curdir = hdd["root"];

let commands = { };
let processes = { };
let chistory = [];
let historyi = -1;

storage.has("game_progress", (err, key) => {
	if (err) return console.error(err);

	if (key) {
		storage.get("game_progress", (err, data) => { utilSAVDAT(data) });
	} else {
		storage.set("game_progress", utilGETDAT(), (err) => { });
	}
});

document.onclick = (e) => { inf.focus() }

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
	let output = "";

	Object.keys(commands).forEach((command) => {
		output += `${command}: ${commands[command].desc}</p><p>`;
	});

	return output;
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
	return "";
}, "Clears output");

commands.save = new Command((args) => {
	storage.set("game_progress", utilGETDAT(), (err) => { });
	return "";
}, "Save game");

commands.cat = new Command((args) => {
	if (args[1] == undefined) return "cat: Enter a file name";

	args.shift();
	let path = args.join(" ");

	if (curdir[path] != undefined) {
		if (curdir[path]["_type"] == "file") {
			return curdir[path].content;
		} else {
			return "cat: Path is not a file";
		}
	} else {
		return "cat: Invalid file path"
	}
}, "Read the contents of a file");

commands.rm = new Command((args) => {
	if (args[1] == undefined) return "rm: Enter a path";

	args.shift();
	let path = args.join(" ");

	if (curdir[path] != undefined) {
		delete curdir[path];
	} else {
		return "rm: Invalid path"
	}
}, "Delete a file or a folder");

commands.cd = new Command((args) => {
	if (args[1] == undefined) return "cd: Enter a directory";

	cd(args[1]);

	loc[0] = "~"; inl.innerText = `${loc.join("/")}/ $`; loc[0] = "root";
	return "";
}, "Change directory, use '..' to go up");

commands.ls = commands.dir = new Command((args) => {
	let output = "";
	let items = Object.keys(curdir); items.shift();

	items.forEach((item) => {
		let type = curdir[item]["_type"].toUpperCase();

		output += `${type} ${item}</p><p>`;
	});

	output += `${items.length} items`;

	return output;
}, "List all files and folders in current directory");

commands.exit = new Command((args) => {
	storage.set("game_progress", utilGETDAT(), (err) => {
		window.location = "../menu/menu.html";
	});
	return "";
}, "Save and go back to the main menu");

function cd(dir) {
	if (dir == "..") {
		if (loc.length != 1) {
			loc.pop();
		}
	} else {
		loc.push(dir);
	}

	update();
}

function cdlist(navto) {
	loc = [];

	navto.forEach((dir) => {
		loc.push(dir);
	});

	update();
}

function update() {
	let x = true;
	do {
		curdir = hdd;
		loc.forEach((dir) => {
			if (curdir[dir] == undefined) {
				loc.pop();
			} else {
				curdir = curdir[dir];
			}
		});

		if (curdir["_type"] != "dir") {
			loc.pop();
		} else {
			x = false;
		}
	} while (x)
}

function utilGETDAT() {
	return {
		hdd: hdd,
		procs: processes
	}
}

function utilSAVDAT(data) {
	hdd = data.hdd;
	processes = data.procs;
}

function utilRINT(min, max) {
	return Math.floor(Math.random() * max) + min;
}

function utilISROOT(loc) {
	if (loc.length == 1 && loc[0] == "root") return true

	return false
}

function utilISEMPTY(loc) {
	if (loc.length == 0) return true
	
	return false
}