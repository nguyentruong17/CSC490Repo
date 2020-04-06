import Matter from 'matter-js';
import Rectangle from '../../components/Rectangle'
import { Dimensions } from 'react-native'

import {
    NUM_ROWS,
    FLOOR_HEIGHT,
    DEBRIS_SHAPES,
    DEBRIS_COLORS,
    DEBRIS_SETTINGS,
    FLOOR_SETTINGS,
    POINTER_SETTINGS,
    DEBRIS_SPAN
} from '../../consts';

import createBody from '../debris/createBody'
import createGameEntity from '../debris/createGameEntity'

import { getRandomInt, getRandomNumber, getRandomProperty } from '../RandomGenerator';

const { width, height } = Dimensions.get('window')

export const setupInitialWorld = (engine) => {

    let world = engine.world

    const floor = Matter.Bodies.rectangle(width / 2, height - FLOOR_HEIGHT / 2, width, FLOOR_HEIGHT, FLOOR_SETTINGS)

    let debris = []

    for (let x = 0; x < NUM_ROWS; x++) {
        let body = createBody(
            {
                shape: getRandomProperty(DEBRIS_SHAPES),
                rowNum: x,
                settings: {
                    frictionAir: getRandomNumber(0.01, 0.04)
                },
                position: {
                    yPos: 0
                }
            }
        )

        debris.push(body)
    }

    const pointer = createBody(
        {

            shape: 'SQUARE',
            settings: {
                friction: 0.2
            },
            position: {
                xPos: (width - DEBRIS_SPAN) / 2,
                yPos: height - FLOOR_HEIGHT - DEBRIS_SPAN
            },
            settings: {
                ...POINTER_SETTINGS
            },
        }
    )

    const objects = [pointer, floor, ...debris]

    objects.forEach(element => {
        Matter.World.addBody(world, element)
    });

    const constraint = Matter.Constraint.create({
        label: "Drag Constraint",
        pointA: { x: 0, y: 0 },
        pointB: { x: 0, y: 0 },
        length: 0,
        stiffness: 1,
        //angularStiffness: 1
    });

    Matter.World.addConstraint(world, constraint);

    const entities = {
        physics: { engine: engine, world: world, constraint: constraint },
        floor: {
            position: floor.position,
            size: { width: width, height: FLOOR_HEIGHT },
            color: 'black',
            renderer: Rectangle
        },
        pointer: createGameEntity({
            body: pointer,
            color: getRandomProperty(DEBRIS_COLORS),
        })

    }

    debris.forEach((element, index) => {
        Object.assign(entities, {
            ['debris_' + index]: createGameEntity({ body: element, color: getRandomProperty(DEBRIS_COLORS) })
        })
    });


    return { entities }
}



export const handleCollision = (engine, entities) => {
    Matter.Events.on(engine, "collisionStart", (event) => {
        let world = entities["physics"].world 
        const pairs = event.pairs;
        
        const collidedPair = [pairs[0].bodyA, pairs[0].bodyB]


        debrisIndex = collidedPair.findIndex(element => element.label === DEBRIS_SETTINGS.label)

        if (debrisIndex >= 0) { //-1 is not found, and index in [0, 1]
            const collidedDebris = collidedPair[debrisIndex]
            const other = collidedPair[1 - debrisIndex]

            //debris to floor --> this is covered by the logic
            // if (other.label === FLOOR_SETTINGS.label) {
            //     const collidedDebrisKey = Object.keys(entities)
            //         .find(key => entities[key].body && entities[key].body.id === collidedDebris.id)
            //     Matter.World.remove(world, collidedDebris);
            //     delete entities[collidedDebrisKey];    
            // }

            const collidedDebrisKey = Object.keys(entities)
                    .find(key => entities[key].body && entities[key].body.id === collidedDebris.id)
            
            // if (other.label === POINTER_SETTINGS.label) {
            //     const entity = entities[collidedDebrisKey]
            //     const color = entity.color
            //     const shape = entity.body.shape


            //     Matter.World.remove(world, collidedDebris);
            //     delete entities[collidedDebrisKey];

            // }

        }


    });
} 