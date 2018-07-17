let out = document.getElementById("output");
let inp = document.getElementById("inform");
let inf = document.getElementById("in");
let inl = document.getElementById("path");

document.body.onclick = (e) => inf.focus();

inp.onsubmit = (e) => {
	let args = inf.value.split(" ");

	out.innerHTML += `${inl.innerText} ${inf.value}`

	inf.value = "";

	out.innerHTML += `<p>${args.join(", ")}</p><br>`;

	return false;
}
