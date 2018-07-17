let out;
let inf;
let inl;

function onload() {
	out = document.getElementById("output");
	inf = document.getElementById("in");
	inl = document.getElementById("path");

	document.body.onclick = (e) => inf.focus();
}