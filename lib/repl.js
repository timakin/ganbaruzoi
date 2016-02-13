"use strict";

class Repl {
	constructor() {
	}

	*inputSchedule (robot) {
		robot.interactive_mode = true;

		let isContinuing = true;
		while (isContinuing) {
			let timing    = yield "< 時間は？";
			let content   = yield "< 内容は？";
			let lastInput = yield "< おわり？";

			// スケジュールをjsonに入れてcurrentStatusを更新
        	let schedule     = {};
        	schedule[timing] = content;
	        jsonManager.record('schedules', schedule);

			isContinuing = lastInput == "おわり";
		}

		robot.interactive_mode = false;
		delete(robot.repl);
	}

	*reschedule (robot) {
		robot.interactive_mode = true;

		let isContinuing = true;
		let reschedules    = [];
		while (isContinuing) {
			let timing    = yield "< 時間は？";
			let content   = yield "< 内容は？";
			let lastInput = yield "< おわり？";

			let unitSchedule = {};
			unitSchedule[timing] = content;
        	reschedules.push(unitSchedule);
			isContinuing = lastInput == "おわり";
		}

		let now  = new Date();
        let date = ("0"+now.getHours().toString()).slice(-2) + ":" + ("0"+now.getMinutes().toString()).slice(-2);
        let rescheduleJson = {};
        rescheduleJson[date] = reschedules;

		jsonManager.record('reschedules', rescheduleJson);

		robot.interactive_mode = false;
		delete(robot.repl);
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