(function (Ω) {

	"use strict";

	var Game = Ω.Class.extend({

		canvas: "body",

		running: false,

		preset_dt: 1 / 60,
		currentTime: Date.now(),
		accumulator: 0,

		screen: new Ω.Screen(),
		lastScreen: null,

		dialog: null,

		time: 0,

		init: function (w, h) {

			var ctx = initCanvas(this.canvas, w, h),
				self = this;

			Ω.env.w = ctx.canvas.width;
			Ω.env.h = ctx.canvas.height;

			Ω.gfx.init(ctx);
			Ω.input.init();

			Ω.onload(function () {
				self.go();
			})

            this.running = true;

		},

		reset: function () {},

		go: function () {
			this.run(Date.now());
		},

		run: function () {

			this.tick(1);
			this.render();

			var self = this;

			window.requestAnimationFrame(function () {
            	self.run(Date.now());
            });

		},

		stop: function () {},

		tick: function (d) {

			this.screen.tick(d);
			Ω.input.tick(d);

		},

		render: function () {

			var gfx = Ω.gfx;

			this.screen.render(gfx);
		},

		setScreen: function (screen) {

			this.lastScreen = null;
			this.lastScreen = this.screen;
			this.screen = screen;

		}
	});

	/*
		Create or assign the canvas element
	*/
	function initCanvas(canvasSelector, w, h) {

		w = w || 400;
		h = h || 225;

		var selCanvas = document.querySelector(canvasSelector),
			newCanvas,
			ctx;

		if (selCanvas == null) {
			console.error("Canvas DOM container not found:", canvasSelector);
			canvasSelector = "body";
			selCanvas = document.querySelector(canvasSelector);
		}

		if (selCanvas.nodeName.toUpperCase() === "CANVAS") {
			var explicitWidth = selCanvas.getAttribute("width"),
				explicitHeight = selCanvas.getAttribute("height");

			if (explicitWidth === null) {
				selCanvas.setAttribute("width", w);
			}
			if (explicitHeight === null) {
				selCanvas.setAttribute("height", h);
			}
			ctx = selCanvas.getContext("2d");
		} else {
			newCanvas = document.createElement("canvas");
			newCanvas.setAttribute("width", w);
			newCanvas.setAttribute("height", h);
			selCanvas.appendChild(newCanvas);
			ctx = newCanvas.getContext("2d");
		}

		if (!ctx) {
			console.error("Could not get 2D context.");
		}

		return ctx;
	}

	Ω.Game = Game;

}(Ω));
