let out = document.getElementById("output");
let inp = document.getElementById("inform");
let inf = document.getElementById("in");
let inl = document.getElementById("path");

let chistory = [];

document.body.onclick = (e) => inf.focus();

inp.onsubmit = (e) => {
	chistory.push(inf.value);

	let args = inf.value.split(" ");
	let output = "";

	out.innerHTML += `<p>${inl.innerText} ${inf.value}</p>`;

	inf.value = "";

	switch (args[0]) {
		case "echo":
			args.shift();
			
			output = args.join(" ");
			break;

		default:
			output = `Invalid command "${args[0]}" specified.`;
	}

	out.innerHTML += `<p>${output}</p><br/>`;

	return false;
}
