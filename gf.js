const canvas = document.querySelector('#canvas');
let ctx;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
const panNode = audioCtx.createStereoPanner();
const gainNode = audioCtx.createGain();
let width = 1024, height = 768;
var updateTime = performance.now();
var drawTime = performance.now();
const lineInterval = 1000/10;
const mixedColors = true;

let title;
let titleFrames = 120;
let title_button;
let girlf, boyf;
let stomach;
let landing;

const 	wrenSound = 		 new Audio("clips/Wren.mp3"),
		nightjarSound = 	 new Audio("clips/Nightjar.mp3"),
		sunSound = 			 new Audio("clips/Sun.mp3"),
		moonSound = 		 new Audio("clips/Moon.mp3");

/* do this for all sounds?? */
const wrenSource = audioCtx.createMediaElementSource(wrenSound);
// wrenSound.play();
// nightjarSound.play();
sunSound.play();
moonSound.play();
wrenSource.connect(panNode);
panNode.connect(audioCtx.destination);

let speechBubbles = [
	{
		file: "frames/bubble-0.json",
		clip: new Audio("clips/weird.mp3"),
		x: 450,
		y: 250,
		scene: 1,
		start: function(bub) {
			//bub.sprite.animation.start();
			bub.sprite.animation.play = true;
		},
		end: function(bub) {
			setTimeout(function() {
				bub.sprite.animation.play = false;
				scene = 2;
				wrenSound.pause();
				nightjarSound.pause();
				setTimeout(function() {
					speechBubbles[1].clip.play();
				}, 1000);
			}, 1000);
		}
	},
	{
		file: "frames/bubble-1.json",
		clip: new Audio("clips/stomach.mp3"),
		x: 500,
		y: 20,
		scene: 2,
		start: function(bub) {
			bub.sprite.animation.play = true;
		},
		end: function(bub) {
			bub.sprite.animation.play = false;
			setTimeout(function() {
				speechBubbles[2].clip.play();
			}, 1000);
		}
	},
	{
		file: "frames/bubble-2.json",
		clip: new Audio("clips/seeds.mp3"),
		x: 200,
		y: 140,
		scene: 2,
		start: function(bub) {
			bub.sprite.animation.play = true;
		},
		end: function(bub) {
			bub.sprite.animation.play = false;
			setTimeout(function() {
				scene = 3;
				setTimeout(function() {
					speechBubbles[3].clip.play();
				}, 1000);
			}, 500);
		}
	},
	{
		file: "frames/bubble-3.json",
		clip: new Audio("clips/nectar.mp3"),
		x: 350,
		y: 120,
		scene: 3,
		start: function(bub) {
			bub.sprite.animation.play = true;
		},
		end: function(bub) {
			bub.sprite.animation.play = false;
			setTimeout(function() {
				speechBubbles[4].clip.play();
			}, 1000);
		}
	},
	{
		file: "frames/bubble-4.json",
		clip: new Audio("clips/breakfast.mp3"),
		x: 700,
		y: 340,
		scene: 3,
		start: function(bub) {
			bub.sprite.animation.play = true;
		},
		end: function(bub) {
			bub.sprite.animation.play = false;
			setTimeout(function() {
				scene = 4;
			}, 500);
		}
	}
];

for (let i = 0; i < speechBubbles.length; i++) {
	const w = speechBubbles[i];
	w.sprite = new Sprite(w.x, w.y);
	w.sprite.addAnimation(w.file, true);
	w.sprite.animation.play = false;
	if (speechBubbles[i].start) {
		speechBubbles[i].clip.addEventListener("play", function() {
			speechBubbles[i].start(speechBubbles[i]);
		});
	}
	if (speechBubbles[i].end) {
		speechBubbles[i].clip.addEventListener("ended", function() {
			speechBubbles[i].end(speechBubbles[i]);
		});
	}
}

/* sprite w no w or h should be equivalent to natural, right? */
// const cursor = new Sprite(0, 0);
// cursor.addAnimation("frames/cursor.json", true);
// const cursor_over = new Sprite(0,0);
// cursor_over.addAnimation("frames/cursor_over.json", true);
let mouseOver = false;
// canvas.style.cursor = "none";


/*
scenes
0: title 
1: first bubble
2: stomach hurts
3: breakfast

joining two?
*/
let scene = 0;

/* figure out scenes structure later */
let scenes = [
	{
		sprites: [
			{
				file: "sun_and_moon_updown.json"
			}
		]

	}
];


function start() {
	// width = window.innerWidth;
	// height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;

	title = new Sprite(0, 0, width, height);
	title.addAnimation("frames/sun_and_moon_updown.json");
	
	// title_button = new Sprite(width * 0.8, height * 0.7);
	// title_button.addAnimation("frames/title_button.json", true);

	girlf = new Sprite(0, 0, width, height);
	girlf.addAnimation("frames/girlf.json");

	boyf = new Sprite(0, 0, width, height);
	boyf.addAnimation("frames/boyf.json");

	stomach = new Sprite(0, 0, width, height);
	stomach.addAnimation("frames/flying.json");

	landing = new Sprite(0, 0, width, height);
	landing.addAnimation("frames/landing.json");

	requestAnimFrame(update);
	requestAnimFrame(draw);
}

function draw() {
	if (performance.now() > drawTime + lineInterval) {
		drawTime = performance.now();
		ctx.clearRect(0, 0, width, height);
		// if (mouseOver) cursor_over.display();
		// else cursor.display();
		if (scene == 0) {
			title.display();
			titleFrames--;
			if (titleFrames <= 0) {
				scene = 1;
				moonSound.pause();
				moonSound.currentTime = 0;
				sunSound.pause();
				sunSound.currentTime = 0;
				wrenSound.play();
				nightjarSound.play();
				setTimeout(function() {
					speechBubbles[0].clip.play();
				}, 2000);
			}
			//title_button.display();
		} else if (scene == 1) {
			girlf.display();
			boyf.display();
			speechBubbles[0].sprite.display();
		} else if (scene == 2) {
			stomach.display();
			speechBubbles[1].sprite.display();
			speechBubbles[2].sprite.display();
		} else if (scene == 3) {
			landing.display();
			speechBubbles[3].sprite.display();
			speechBubbles[4].sprite.display();
		}
		
	}
	requestAnimFrame(draw);
}

function update() {
	if (scene == 0) {
		//title_button.update();
	}
	if (scene == 1) {
		speechBubbles[0].sprite.update();
	}
	if (scene == 2) {
		speechBubbles[1].sprite.update();
		speechBubbles[2].sprite.update();
	}
	if (scene == 3) {
		speechBubbles[3].sprite.update();
		speechBubbles[4].sprite.update();
	}
	requestAnimFrame(update);
}

if (canvas.getContext) {
	ctx = canvas.getContext('2d');
	ctx.miterLimit = 1;

	start();
}

function sizeCanvas() {
	const padding = 10;
	let scale = window.innerWidth / width;

	if (scale * width / (window.innerHeight - canvas.getBoundingClientRect().top) > width/height) {
		canvas.height = window.innerHeight - canvas.getBoundingClientRect().top - (padding * 2);
		canvas.width = canvas.height * (width / height);
		scale = canvas.height / height;
	} else {
		canvas.width = Math.min(width * scale, width) - padding * 2;
		canvas.height = Math.min(height * scale, height);
	}

	if (scale != 1) 
		ctx.scale(scale, scale);

	ctxStrokeColor = undefined;
	document.getElementById("wrap").style.width = canvas.width + "px";
	canvas.style.marginTop = padding + "px";
	ctx.miterLimit = 1;
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas, false);


function mouseClicked(x,y) {

	if (scene == 0) {
		// if (title_button.tap(x,y)) {
		// 	scene = 1;
		// 	moonSound.pause();
		// 	moonSound.currentTime = 0;
		// 	sunSound.pause();
		// 	sunSound.currentTime = 0;
		// 	wrenSound.play();
		// 	nightjarSound.play();
		// }
	}

	for (let i = 0; i < speechBubbles.length; i++) {
		if (speechBubbles[i].sprite.tap(x,y)) {
			if (scene == speechBubbles[i].scene) {
				speechBubbles[i].clip.play();
				if (speechBubbles[i].callback)
					speechBubbles[i].clip.addEventListener("ended", speechBubbles[i].callback);
			}
		}
	}
}

let bkgColor = 255;
let change = -5;
let bgInterval = 3;

function mouseMoved(x, y) {

	/* sprite hovers */
	let hover = false;
	// if (scene == 0 && title_button.tap(x,y)) {
	// 	hover = true;
	// }
	for (let i = 0; i < speechBubbles.length; i++) {
		if (speechBubbles[i].sprite.tap(x,y) && scene == speechBubbles[i].scene) {
			hover = true;
		}
	}

	if (hover) {
		if (!mouseOver) mouseOver = true;
	} else {
		if (mouseOver) mouseOver = false;
	}

	if (mouseOver) {
		canvas.style.cursor = "pointer";
		// cursor_over.position.x = x - cursor_over.size.x/2;
		// cursor_over.position.y = y - cursor_over.size.y/2;
	} else {
		canvas.style.cursor = "default";
		// cursor.position.x = x - cursor.size.x/2;
		// cursor.position.y = y - cursor.size.y/2;
	}
	
	/* background changing */
	bkgColor = Math.floor(map(y, 0, height, bgInterval+1, 0));
	const bg = Math.floor( bkgColor * (255/bgInterval));
	canvas.style.backgroundColor = "rgb("+bg+","+bg+","+bg+")";
	
	//bkgColor += change;
	//if (bkgColor < -255/2 || bkgColor > 255 * 1.5) change *= -1; 
	
	const pan = Math.floor(map(x, 0, width, -1, 1));
	panNode.pan.value = pan;
}

