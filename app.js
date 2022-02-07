import { Game } from "./game.js";

var frameRate = 10;
var resolution = { height: 400, width: 400 };

let canvas = document.getElementById("canvas");
canvas.height = resolution.height;
canvas.width = resolution.width;

window.addEventListener("load", () => {
	registerSW();
});

const registerSW = async () => {
	// this line checks wether the browser supports serviceWorker or not.
	if ("serviceWorker" in navigator) {
		try {
			await navigator.serviceWorker.register("./sw.js");
		} catch (e) {
			console.log(`SW registration failed`);
		}
	}
};

let settings = {
	canvas: canvas,
	gridsize: { x: 25, y: 25 },
	colors: { snake: "#fafafa", food: "#fa3232", background: "#323232" },
	controls: {
		left: [65, 37], //I manually typed in all the keycodes 'cause I don't have an alternative
		right: [39, 68],
		up: [87, 38],
		down: [40, 83],
	},
	scoreBoard: document.getElementById("score"),
};

let game = new Game(settings);

document.body.addEventListener("keydown", (event) => {
	game.eventLoop(event);
});
document.getElementById("pause").addEventListener("click", () => {
	game.togglePause();
});
setInterval(game.gameLoop, 1000 / frameRate);
