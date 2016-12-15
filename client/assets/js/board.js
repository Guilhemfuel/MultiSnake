'use strict';

import createCanvasGame from './createCanvasGame.js';
import Snake from './snake';
import Apple from './apple';
import scoreBoard from './scoreboard';
import $ from 'jquery';
import * as constant from './constant';

export default class Board {

	constructor() {
		this.context = createCanvasGame();
		this.snakes = [];
		this.apples = [];
		this.color = [
			"#468966",
			"#fff1a8",
			"#FFB03B",
			"#B64926",
			"#f64804",
			"#3032cd",
			"#CD2C24",
			"#13ad00",
			"#51f1e0",
			"#F2385A"
		];
	}

	newSnake(x, y, name) {
        if(this.snakes.length < 10){
            let snake = new Snake(this.context, x, y, this.getAvailableColor(), name);
            snake.draw();

            this.snakes.push(snake);
        } else {
            console.error('Error : only 10 snakes can be on the board');
        }
	}

	newApple(x, y) {
		let apple = new Apple(this.context, x, y);
		apple.draw();

		this.apples.push(apple);
	}

	getAvailableColor() {
		let snakeColor = this.snakes.map(function (snake) {
			return snake.color;
		});

		return this.color.find(function (c) {
			if (!snakeColor.includes(c)) {
				return c;
			}
		});
	}

	render() {
		setInterval(() => {
            // TEMP: ONLY START MOVING THE FIRST SNAKE FOR TEST PURPOSES
			this.snakes[0].move(this);
            // END TEMP
		}, constant.DELAY);

		scoreBoard(this.snakes);

		$('body').keydown((e) => {
			let snake = this.snakes[0];
			if (e.keyCode === 37 && snake.direction !== 'right') {
				snake.direction = 'left';
			}
			else if (e.keyCode === 38 && snake.direction !== 'down') {
				snake.direction = 'up';
			}
			else if (e.keyCode === 39 && snake.direction !== 'left') {
				snake.direction = 'right';
			}
			else if (e.keyCode === 40 && snake.direction !== 'up') {
				snake.direction = 'down';
			}
		});
	}

}
