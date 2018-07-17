let out = document.getElementById("output");
let inp = document.getElementById("inform");
let inf = document.getElementById("in");
let inl = document.getElementById("path");

document.body.onclick = (e) => inf.focus();

inp.onsubmit = (e) => {
	let args = inf.value.split(" ");
	let output = "";

	out.innerHTML += `<p>${inl.innerText} ${inf.value}</p>`

	inf.value = "";

	out.innerHTML += `<p>${output}</p><br/>`;

	return false;
}
