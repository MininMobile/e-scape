const path = require('path');

let o = document.getElementById("o");
let c = document.getElementById("c");

let user = process.env['USERPROFILE'].split(path.sep)[2];

let i = 0;
let user1 = `hello?          
is anyone there?          `;

let user2 = `yes,     it's me,         ${user}                    
I think`;

setTimeout(() => {
	i = 0;
	let writethread1 = setInterval(() => {
		if (i < user1.length) {
			o.innerText += user1[i];
			i++;
		} else {
			clearInterval(writethread1);
			o.classList.toggle("noblink");
			c.classList.toggle("noblink");

			i = 0;
			let writethread2 = setInterval(() => {
				if (i < user2.length) {
					c.innerText += user2[i];
					i++;
				} else {
					clearInterval(writethread2);

					setInterval(() => {
						document.body.innerText += "！＄！＃％１２４７＆＠＆％９０７＠！＄＊！＄！＃％１２４７＆＠＆％９０７＠！＄＊！＄！＃％１２４７＆＠＆％９０７＠！＄＊！＄！＃％１２４７＆＠＆％９０７＠！＄＊！＄！＃％１２４７＆＠＆％９０７＠！＄＊";
						scroll(0, window.innerHeight);
					}, 0);

					setTimeout(() => {
						window.location = "console.html";
					}, 100);
				}
			}, 100);
		}
	}, 100);
}, 1000);
