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

let stomach;
let landing;
let sky;

const 	wrenSound = 		 new Audio("clips/Wren.mp3"),
		nightjarSound = 	 new Audio("clips/Nightjar.mp3"),
		sunSound = 			 new Audio("clips/Sun.mp3"),
		moonSound = 		 new Audio("clips/Moon.mp3");

/* do this for all sounds?? */
const wrenSource = audioCtx.createMediaElementSource(wrenSound);
// wrenSound.play();
// nightjarSound.play();
// sunSound.play();
// moonSound.play();
wrenSource.connect(panNode);
panNode.connect(audioCtx.destination);

/*
scenes
0: title 
1: first bubble
2: stomach hurts
3: breakfast
joining two?
*/
let currentScene = 0;

/* figure out scenes structure later */
let scenes = [
/* title scene */
	{
		sprites: [
			{
				file: "frames/sun_and_moon_updown.json",
			}
		],
		frames: 60,
		end: function() {
			currentScene = 1;
		}
	},
/* first scene, wren and nj */
	{
		sprites: [
			{
				file: "frames/girlf.json"

			},
			{
				file: "frames/boyf.json"
			}
		],
		speech: [
			{
				file: "frames/bubble-0.json",
				clip: new Audio("clips/weird.mp3"),
				x: 450,
				y: 250,
				delay: 2000,
				nextScene: 2,
				nextDelay: 1000
			}
		]
	},
/* second scene  */
	{
		sprites: [
			{
				file: "frames/flying.json"
			}
		],
		speech: [
			{
				file: "frames/bubble-1.json",
				clip: new Audio("clips/stomach.mp3"),
				x: 500,
				y: 20,
				delay: 1000,
			},
			{
				file: "frames/bubble-2.json",
				clip: new Audio("clips/like_seeds.mp3"),
				x: 200,
				y: 140,
				delay: 5000,
				nextScene: 3,
				nextDelay: 500
			}
		]
	},
/*  third scene */
	{
		sprites: [
			{
				file: "frames/landing.json"
			}
		],
		speech: [
			{
				file: "frames/bubble-3.json",
				clip: new Audio("clips/nectar.mp3"),
				x: 350,
				y: 120,
				delay: 2000,
			},
			{
				file: "frames/bubble-4.json",
				clip: new Audio("clips/breakfast.mp3"),
				x: 700,
				y: 340,
				delay: 7000,
				nextScene: 4,
				nextDelay: 1000
			}
		]
	},
/* fourth scene */
	{
		sprites: [
			{ file: "frames/sky.json" },
			{ 
				file: "frames/moon_bkg.json",
				bkg: true,
			},
			{ 
				file: "frames/moon_bkg_2.json",
				bkg: true,
			},
			{ 
				file: "frames/moon.json",
			}
		],
		speech: [
			{
				file: "frames/bubble-5.json",
				clip: new Audio("clips/so_tired.mp3"),
				x: 400,
				y: 220,
				delay: 1000,
			},
			{
				file: "frames/bubble-6.json",
				clip: new Audio("clips/said_moon.mp3"),
				x: 150,
				y: 320,
				delay: 8000,
			},
			{
				file: "frames/bubble-5.json",
				clip: new Audio("clips/eyes_open.mp3"),
				x: 400,
				y: 220,
				delay: 12000,
			},
			{
				file: "frames/bubble-6.json",
				clip: new Audio("clips/maybe_late.mp3"),
				x: 150,
				y: 320,
				delay: 16000,
				nextScene: 5,
				nextDelay: 1000
			}
		]
	},
/* fifth scene */
	{
		sprites: [
			{ file: "frames/brain.json" }
		],
		speech: [
			{
				file: "frames/bubble-7.json",
				clip: new Audio("clips/kill_brain.mp3"),
				x: 380,
				y: 250,
				delay: 1000

			},
			{
				file: "frames/bubble-8.json",
				clip: new Audio("clips/dont_think_so.mp3"),
				x: 820,
				y: 400,
				delay: 8000,
				nextScene: 6,
				nextDelay: 3000
			}
		],
		bgImg: "imgs/sky.jpg"
	},
/* sixth scene */
	{
		sprites: [
			{ file: "frames/puke_last.json"}
		],
		speech: [
			{
				file: "frames/bubble-9.json",
				clip: new Audio("clips/puked_last.mp3"),
				x: 300,
				y: 200,
				delay: 1000
			},
			{
				file: "frames/bubble-10.json",
				clip: new Audio("clips/what_mean.mp3"),
				x: 400,
				y: 400,
				delay: 6000,
				nextScene: 7,
				nextDelay: 500
			}
		],
		bgImg: "imgs/prints.jpg"
	},
/* seventh scene */
	{
		hasSetup: true,
		setup: function() {
			canvas.style.backgroundColor = "black";
		},
		sprites: [
			{ 
				file: "frames/puking_bkg.json",
				bkg: true,
			},
			{ 
				file: "frames/puking.json",
			}
		],
		speech: [
			{
				clip: new Audio("clips/up_late.mp3"),
				delay: 1000,
			},
			{
				clip: new Audio("clips/she_eat.mp3"),
				delay: 8000,
			},
			{
				clip: new Audio("clips/solid_food.mp3"),
				delay: 12000,
				nextScene: 8,
				nextDelay: 1000
			}
		]
	},
/* eight scene */
	{
		hasSetup: true,
		setup: function() {
			canvas.style.backgroundColor = "white";
		},
		sprites: [
			{ file: "frames/pooping.json" },
			{ file: "frames/clouds.json"}
		],
		speech: [
			{
				file: "frames/bubble-12.json",
				x: 450,
				y: 300,
				clip: new Audio("clips/dinner_for_you.mp3"),
				delay: 1000,
			},
			{
				file: "frames/bubble-11.json",
				x: 850,
				y: 60,
				clip: new Audio("clips/guess_so.mp3"),
				delay: 4000,
			},
			{
				file: "frames/bubble-12.json",
				x: 450,
				y: 300,
				clip: new Audio("clips/you_puked.mp3"),
				delay: 9000,
			},
			{
				file: "frames/bubble-11.json",
				x: 850,
				y: 60,
				clip: new Audio("clips/poop_trees.mp3"),
				delay: 10000,
			},
			{
				file: "frames/bubble-12.json",
				x: 450,
				y: 300,
				clip: new Audio("clips/pooping_now.mp3"),
				delay: 27000,
				nextScene: 9,
				nextDelay: 1000
			}
		]
	},
/* ninth scene */
	{
		bgImg: "imgs/stump.jpg",
		sprites: [
			{ file: "frames/stump.json"}
		],
		speech: [
			{
				file: "frames/bubble-14.json",
				x: 750,
				y: 250,
				clip: new Audio("clips/idk.mp3"),
				delay: 1000,
			},
			{
				file: "frames/bubble-13.json",
				x: 770,
				y: 200,
				clip: new Audio("clips/she_cool.mp3"),
				delay: 4000,
			},
			{
				file: "frames/bubble-14.json",
				x: 750,
				y: 250,
				clip: new Audio("clips/really_cool.mp3"),
				delay: 6000,
			},
			{
				file: "frames/bubble-13.json",
				x: 770,
				y: 200,
				clip: new Audio("clips/awake.mp3"),
				delay: 10000,
			},{
				file: "frames/bubble-14.json",
				x: 750,
				y: 250,
				clip: new Audio("clips/yeah.mp3"),
				delay: 14000,
			},
			{
				file: "frames/bubble-13.json",
				x: 770,
				y: 200,
				clip: new Audio("clips/crazy.mp3"),
				delay: 16000,
				nextScene: 10,
				nextDelay: 1000
			}
		]
	},
/* tenth scene */
	{
		hasSetup: true,
		setup: function() {
			canvas.style.backgroundColor = "black";
		},
		sprites: [
			{ file: "frames/yesterday_bkg.json", bkg:true },
			{ file: "frames/yesterday.json" }
		],
		speech: [
			{
				file: "frames/bubble-16.json",
				clip: new Audio("clips/yesterday.mp3"),
				delay: 1000,
			},
			{
				file: "frames/bubble-15.json",
				clip: new Audio("clips/yesterday_ate_stuff.mp3"),
				delay: 4000,
			},
			{
				file: "frames/bubble-16.json",
				clip: new Audio("clips/yesterday_eat.mp3"),
				delay: 9000,
			},
			{
				file: "frames/bubble-15.json",
				clip: new Audio("clips/yesterday_usual.mp3"),
				delay: 12000,
			},
			{
				file: "frames/bubble-16.json",
				clip: new Audio("clips/yesterday_stuff.mp3"),
				delay: 15000,
			},
			{
				file: "frames/bubble-15.json",
				clip: new Audio("clips/yesterday_not_really.mp3"),
				delay: 20000,
			},
			{
				file: "frames/bubble-16.json",
				clip: new Audio("clips/yesterday_sleep.mp3"),
				delay: 24000,
			},
			{
				file: "frames/bubble-15.json",
				clip: new Audio("clips/yesterday_nah.mp3"),
				delay: 29000,
				nextScene: 11,
				nextDelay: 1000
			}
		]
	},
/* eleven */
	{
		hasSetup: true,
		setup: function() {
			canvas.style.backgroundColor = "white";
		},
		sprites: [
			{ file: "frames/not_sure.json" },
			{ file: "frames/not_sure_wind.json" }
		],
		speech: [
			{
				file: "frames/bubble-18.json",
				clip: new Audio("clips/someone_pooped.mp3"),
				delay: 1000,
			},
			{
				file: "frames/bubble-17.json",
				clip: new Audio("clips/not_sure.mp3"),
				delay: 8000,
				nextScene: 12,
				nextDelay: 1000
			}
		]
	},
/* twelve */
	{
		sprites: [
			{ file: "frames/blueberry.json" }
		],
		speech: [
			{
				file: "frames/bubble-20.json",
				clip: new Audio("clips/blueberry.mp3"),
				delay: 1000,
			},
			{
				file: "frames/bubble-19.json",
				clip: new Audio("clips/wake_me_up.mp3"),
				delay: 16000,
			},
			{
				file: "frames/bubble-20.json",
				clip: new Audio("clips/sure.mp3"),
				delay: 26000,
				nextScene: 13,
				nextDelay: 1000
			}
		]
	},
/* thirteen */
	{
		sprites: [
			{ file: "frames/brain_2_bkg.json", bkg:true },
			{ file: "frames/brain_2.json"},
			{ file: "frames/brain_2_lines.json", loop: false}
		],
		speech: [
			{
				file: "frames/bubble-21.json",
				clip: new Audio("clips/brain_2.mp3"),
				delay: 3000,
			},
			{
				file: "frames/bubble-22.json",
				clip: new Audio("clips/sure_sometimes.mp3"),
				delay: 7000,
			},
			{
				file: "frames/bubble-21.json",
				clip: new Audio("clips/not_possible.mp3"),
				delay: 10000,
				nextScene: 14,
				nextDelay: 2500
			}
		]
	},
/* fourteen */
	{
		sprites: [
			{ file: "frames/while_sleeping_bkg.json", bkg:true },
			{ file: "frames/while_sleeping.json"},
			{ file: "frames/sky_anim.json", loop: false}
		],
		speech: [
			{
				file: "frames/bubble-23.json",
				x: 50,
				y: 0,
				clip: new Audio("clips/while_sleeping.mp3"),
				delay: 3000,
			},
			{
				file: "frames/bubble-24.json",
				x: -10,
				y: 20,
				clip: new Audio("clips/same_usual.mp3"),
				delay: 7000,
			},
			{
				file: "frames/bubble-23.json",
				x: 50,
				y: 0,
				clip: new Audio("clips/sounds_nice.mp3"),
				delay: 12000,
				nextScene: 15,
				nextDelay: 5000
			}
		]
	},
/* fifteen */
	{
		hasSetup: true,
		setup: function() {
			canvas.style.backgroundColor = "black";
		},
		sprites: [
			{ file: "frames/tomorrow_bkg.json", bkg: true },
			{ file: "frames/tomorrow.json"}
		],
		speech: [
			{
				file: "frames/bubble-26.json",
				clip: new Audio("clips/tomorrow.mp3"),
				delay:1000
			},
			{
				file: "frames/bubble-25.json",
				clip: new Audio("clips/your_day.mp3"),
				delay: 6000
			},
			{
				file: "frames/bubble-26.json",
				clip: new Audio("clips/my_morning.mp3"),
				delay:10000
			},
			{
				file: "frames/bubble-25.json",
				clip: new Audio("clips/nah.mp3"),
				delay: 14000
			},
			{
				file: "frames/bubble-26.json",
				clip: new Audio("clips/see_you.mp3"),
				delay:17000
			},
			{
				file: "frames/bubble-25.json",
				clip: new Audio("clips/hurts.mp3"),
				delay: 20000
			},
			{
				file: "frames/bubble-26.json",
				clip: new Audio("clips/cant_see.mp3"),
				delay: 22000,
				nextScene: 16,
				nextDelay: 1000
			}

		]
	},
/* sixteen */
	{
		hasSetup: true,
		setup: function() {
			canvas.style.backgroundColor = "white";
		},
		sprites: [
			{ file: "frames/kind_of.json"}
		],
		speech: [
			{
				file: "frames/bubble-28.json",
				clip: new Audio("clips/cant_see_2.mp3"),
				delay:1000
			},
			{
				file: "frames/bubble-27.json",
				clip: new Audio("clips/you_cant.mp3"),
				delay: 6000
			},
			{
				file: "frames/bubble-28.json",
				clip: new Audio("clips/kind_of.mp3"),
				delay:9000
			},
			{
				file: "frames/bubble-27.json",
				clip: new Audio("clips/hasnt_woke_me.mp3"),
				delay: 12000,
				nextScene: 17,
				nextDelay: 1000
			}

		]
	},
];


/* sprite w no w or h should be equivalent to natural, right? */
// const cursor = new Sprite(0, 0);
// cursor.addAnimation("frames/cursor.json", true);
// const cursor_over = new Sprite(0,0);
// cursor_over.addAnimation("frames/cursor_over.json", true);
let mouseOver = false;
// canvas.style.cursor = "none";

function start() {
	canvas.width = width;
	canvas.height = height;

	scenes.forEach(function(scene) {
		scene.sprites.forEach(function(sprite) {
			if (sprite.x == undefined) sprite.sprite = new Sprite(0, 0, width, height);
			else sprite.sprite = new Sprite(sprite.x, sprite.y, sprite.w, sprite.h);
			if (sprite.debug) sprite.sprite.debug = true;
			if (sprite.bkg) sprite.sprite.bkg = true;
			if (sprite.file) sprite.sprite.addAnimation(sprite.file);
			if (sprite.loop != undefined) sprite.sprite.animation.loop = sprite.loop;
		});
		if (scene.speech) {
			scene.speech.forEach(function(speech) {
				speech.played = false;
				if (speech.x == undefined) speech.sprite = new Sprite(0, 0, width, height);
				else speech.sprite = new Sprite(speech.x, speech.y);
				if (speech.debug) speech.sprite.debug = true;
				speech.sprite.addAnimation(speech.file);
				speech.sprite.animation.play = false;
				speech.clip.addEventListener("play", speech.sprite.animation.start);
				speech.clip.addEventListener("ended", speech.sprite.animation.stop);
				if (speech.nextScene != undefined) {
					speech.clip.addEventListener("ended", function() {
						setTimeout(function() {
							currentScene = speech.nextScene;
						}, speech.nextDelay);
					});
				}
			});
		}
		if (scene.bgImg) {
			scene.image = new Image();
			scene.image.src = scene.bgImg;
		}
	});
	
	// title_button = new Sprite(width * 0.8, height * 0.7);
	// title_button.addAnimation("frames/title_button.json", true);

	sky = new Sprite(0,0,width,height);
	sky.addAnimation("frames/sky.json");

	requestAnimFrame(update);
	requestAnimFrame(draw);
}

function draw() {
	if (performance.now() > drawTime + lineInterval) {
		drawTime = performance.now();
		ctx.clearRect(0, 0, width, height);
		// if (mouseOver) cursor_over.display();
		// else cursor.display();

		if (scenes[currentScene].hasSetup) {
			scenes[currentScene].setup();
			scenes[currentScene].hasSetup = false;
		}

		if (scenes[currentScene].image) {
			ctx.drawImage(scenes[currentScene].image,0,0);
		}

		scenes[currentScene].sprites.forEach(function(sprite) {
			sprite.sprite.display();
		});
		if (scenes[currentScene].speech) {
			scenes[currentScene].speech.forEach(function(speech){
				speech.sprite.display();
				if (speech.delay && !speech.played) {
					speech.played = true;
					setTimeout(function() {
						speech.clip.play();
					}, speech.delay);
				}
			});
		}
		if (scenes[currentScene].frames) {
			scenes[currentScene].frames--;
			if (scenes[currentScene].frames <= 0) {
				scenes[currentScene].end();
			}
		}

		
	}
	requestAnimFrame(draw);
}

function update() {
	// requestAnimFrame(update);
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
	// for (let i = 0; i < speechBubbles.length; i++) {
	// 	if (speechBubbles[i].sprite.tap(x,y) && scene == speechBubbles[i].scene) {
	// 		hover = true;
	// 	}
	// }

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
	
	/* black and white */
	if (currentScene <= 3) {
		if (y < height * 0.8) {
			if (canvas.style.backgroundColor != "white") {
				canvas.style.backgroundColor = "white";
			}
		} else {
			if (canvas.style.backgroundColor != "black") {
				canvas.style.backgroundColor = "black";
			}
		}
	} else if (currentScene == 4) {
		let j = Math.floor(map(y,0,height,1,10));
		scenes[currentScene].sprites[0].sprite.animation.jiggle = j;
	} else if (currentScene == 11) {
		let j = Math.floor(map(y,0,height,1,10));
		scenes[currentScene].sprites[1].sprite.animation.jiggle = j;
	}

	// let j = Math.floor(map(y,0,height,1,10));
	// sky.animation.jiggle = j;

	
	
	//bkgColor += change;
	//if (bkgColor < -255/2 || bkgColor > 255 * 1.5) change *= -1; 
	
	const pan = Math.floor(map(x, 0, width, -1, 1));
	panNode.pan.value = pan;
}

