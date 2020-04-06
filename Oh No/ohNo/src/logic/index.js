// https://github.com/bberak/react-native-game-engine-handbook/blob/master/app/physics/rigid-bodies/systems.js
import Matter, { World } from "matter-js";
import { Dimensions } from 'react-native'

import { DEBRIS_SPAN, DEBRIS_SETTINGS, POINTER_SETTINGS, FLOOR_HEIGHT } from '../consts'

const { width, height } = Dimensions.get('window')
let boxId = 0 

const distance = ([x1, y1], [x2, y2]) =>
	Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));

const Gravity = (entities, { time }) => {

    //-- I'm choosing to update the game state (entities) directly for the sake of brevity and simplicity.
    //-- There's nothing stopping you from treating the game state as immutable and returning a copy..
    //-- Example: return { ...entities, t.id: { UPDATED COMPONENTS }};
    //-- That said, it's probably worth considering performance implications in either case.

    let engine = entities["physics"].engine;
    Matter.Engine.update(engine, time.delta);


    return entities;
};

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
		constraint.pointA = { x: move.event.pageX, y: entities['pointer'].body.position.y  };
	}

	const currentPointerPosX = entities['pointer'].body.position.x
	let correctX = currentPointerPosX
	if ( currentPointerPosX <= DEBRIS_SPAN/2 ) {
		correctX = DEBRIS_SPAN/2
	} else if (currentPointerPosX >= (width - DEBRIS_SPAN/2)) {
		correctX = width - DEBRIS_SPAN/2
	} 
	Matter.Body.setPosition(entities['pointer'].body, {x: correctX, y: height - (FLOOR_HEIGHT+DEBRIS_SPAN/2)})


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
	//console.log(Object.keys(entities).length)
	Object.keys(entities)
		.filter(key => 
			entities[key].body
			&& entities[key].body.label === DEBRIS_SETTINGS.label
			&& entities[key].body.position.y >= (height - FLOOR_HEIGHT - DEBRIS_SPAN /2))
		.forEach(key => {
			//console.log(key)
			Matter.World.remove(world, entities[key].body);
			delete entities[key];
		});

	return entities;
};

export { Gravity, MovePointer, CleanDebris };