"use strict";

class Repl {
	constructor() {
	}

	*test (robot) {
		robot.interactive_mode = true;
		let test1 = yield "質問1!";
		let test2 = yield "質問2!";
		let test3 = yield "質問3!";
		console.log("INPUT: " + test1 + test2 + test3);
		robot.interactive_mode = false;
		delete(robot.repl);
	}

}

let instance = new Repl();
module.exports = instance;