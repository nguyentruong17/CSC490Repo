// https://github.com/bberak/react-native-game-engine-handbook/blob/master/app/physics/rigid-bodies/systems.js
import Matter from "matter-js";
import { Dimensions } from 'react-native'

import {
	DEBRIS_SPAN,
	DEBRIS_SHAPES,
	DEBRIS_COLORS,
	DEBRIS_SETTINGS,
	POINTER_SETTINGS,
	FLOOR_HEIGHT,
	NUM_ROWS
} from '../consts'
import { getRandomNumber, getRandomProperty } from '../utils/RandomGenerator'
import createBody from '../utils/debris/createBody'
import createGameEntity from '../utils/debris/createGameEntity'

const { width, height } = Dimensions.get('window')
let countTick = 0
let batchCount = 1

const distance = ([x1, y1], [x2, y2]) =>
	Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));

const Gravity = (entities, { time }) => {
	const engine = entities["physics"].engine;
	Matter.Engine.update(engine, time.delta);
	return entities;
};

const SpawnDebris = (entities, { time }) => {

	const engine = entities["physics"].engine
	console.log(Object.keys(entities).length, engine.world.bodies.length)
	console.log(entities['pointer'].body.id)

	if (countTick === 0) { 
		const debris = []
		for (let x = 0; x < NUM_ROWS; x++) {
			let body = createBody({
				shape: getRandomProperty(DEBRIS_SHAPES),
				rowNum: x,
				settings: {
					frictionAir: getRandomNumber(0.003, 0.007),
					...DEBRIS_SETTINGS
				},
				position: {
					yPos: 0
				}
			})

			debris.push(body)
		}


		debris.forEach((element, index) => {
			Matter.World.addBody(engine.world, element)
			Object.assign(entities, {
				[`debris_${batchCount}_${index}`]: createGameEntity({ body: element, color: getRandomProperty(DEBRIS_COLORS) })
			})
		});

		//increment 
		batchCount++
		countTick++
	} else {
		if (countTick === 60 * 3) { // 3 seconds
			countTick = 0
		} else {
			countTick++
		}
	}
	return entities

}

const MovePointer = (entities, { touches }) => {

	let constraint = entities["physics"].constraint;

	//-- Handle start touch
	let start = touches.find(x => x.type === "start");

	if (start) {
		let startPos = [start.event.pageX, start.event.pageY];

		let boxId = Object.keys(entities).find(key => {
			let body = entities[key].body;
			let isPointer = body ? body.label == POINTER_SETTINGS.label : false

			return (
				body && isPointer &&
				distance([body.position.x, body.position.y], startPos) < (3*DEBRIS_SPAN /4)
			);
		});

		if (boxId) {
			constraint.pointA = { x: startPos[0], y: startPos[1] };
			constraint.bodyB = entities[boxId].body;
			constraint.pointB = { x: 0, y: 0 };
			constraint.angleB = entities[boxId].body.angle;
		}
	}

	//-- Handle move touch
	let move = touches.find(x => x.type === "move");

	if (move) {
		constraint.pointA = { x: move.event.pageX, y: entities['pointer'].body.position.y };
	}

	const currentPointerPosX = entities['pointer'].body.position.x
	let correctX = currentPointerPosX
	if (currentPointerPosX <= DEBRIS_SPAN / 2) {
		correctX = DEBRIS_SPAN / 2
	} else if (currentPointerPosX >= (width - DEBRIS_SPAN / 2)) {
		correctX = width - DEBRIS_SPAN / 2
	}
	Matter.Body.setPosition(entities['pointer'].body, { x: correctX, y: height - (FLOOR_HEIGHT + DEBRIS_SPAN / 2) })


	//-- Handle end touch
	let end = touches.find(x => x.type === "end");

	if (end) {
		constraint.pointA = null;
		constraint.bodyB = null;
		constraint.pointB = null;
	}

	return entities;
};

const CleanDebris = (entities, { touches, screen }) => {
	let world = entities["physics"].world;

	Object.keys(entities)
		.filter(key =>
			entities[key].body
			&& entities[key].body.label === DEBRIS_SETTINGS.label
			&& entities[key].body.position.y >= (height - FLOOR_HEIGHT - DEBRIS_SPAN / 2))
		.forEach(key => {
			Matter.Composite.removeBody(world, entities[key].body);
			delete entities[key];
		});
	return entities;
};

export { Gravity, MovePointer, CleanDebris, SpawnDebris };