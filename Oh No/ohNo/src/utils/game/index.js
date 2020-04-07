import Matter from 'matter-js';
import Rectangle from '../../components/Rectangle'
import { Dimensions, Alert } from 'react-native'

import {
    NUM_ROWS,
    FLOOR_HEIGHT,
    DEBRIS_COLORS,
    DEBRIS_SETTINGS,
    FLOOR_SETTINGS,
    POINTER_SETTINGS,
    DEBRIS_SPAN,
    POINTER_INITIAL_PROPS
} from '../../consts';

import createBody from '../debris/createBody'
import createGameEntity from '../debris/createGameEntity'
import { getRandomProperty } from '../RandomGenerator'

const { width, height } = Dimensions.get('window')
let curScore = 0

export const setupInitialWorld = (engine) => {

    let world = engine.world

    const floor = Matter.Bodies.rectangle(width / 2, height - FLOOR_HEIGHT / 2, width, FLOOR_HEIGHT, FLOOR_SETTINGS)
    const pointer = createBody(POINTER_INITIAL_PROPS)

    const objects = [pointer, floor]

    objects.forEach(element => {
        Matter.World.addBody(world, element)
    });

    const constraint = Matter.Constraint.create({
        label: "Drag Constraint",
        pointA: { x: 0, y: 0 },
        pointB: { x: 0, y: 0 },
        length: 0,
        stiffness: 0.01
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
    return { entities }
}

export const handleCollision = (engine, entities, stateHooksObject) => {
    const { scoring, running } = stateHooksObject
    const {  setScore } = scoring
    const { setIsRunning } = running
    Matter.Events.on(engine, "collisionStart", (event) => {

        const world = entities["physics"].world
        const pairs = event.pairs;

        const collidedPair = [pairs[0].bodyA, pairs[0].bodyB]

        debrisIndex = collidedPair.findIndex(element => element.label === DEBRIS_SETTINGS.label)

        if (debrisIndex >= 0) { //-1 is not found, and index in [0, 1]
            const collidedDebris = collidedPair[debrisIndex]
            const other = collidedPair[1 - debrisIndex]

            const collidedDebrisKey = Object.keys(entities)
                .find(key => entities[key].body && entities[key].body.id === collidedDebris.id)

            //when Debris collides to Pointer
            if (other.label === POINTER_SETTINGS.label) {
                if (collidedDebrisKey) {
                    const collidedDebris = entities[collidedDebrisKey]
                    const pointer = entities['pointer']

                    const isOhNo = checkOhNo(pointer, collidedDebris)
                    
                    //if it's not oh no
                    if (!isOhNo) {

                        const { body, color } = getPointerNextProp(pointer, collidedDebris)

                        Matter.Composite.removeBody(world, pointer)
                        Matter.World.addBody(world, body)
                        Object.assign(entities, {
                            'pointer': createGameEntity({ body, color })
                        })

                        //remove all debris of the batch if not Oh No
                        const batchNum = collidedDebrisKey.split('_')[1]
                        const debrisOfSameBatch = []
                        const debrisOfSameBatchKeys = []
                        for (let x = 0; x < NUM_ROWS; x++) {
                            const key = `debris_${batchNum}_${x}`
                            const debris = entities[key] ? entities[key].body : null
                            if (debris) {
                                debrisOfSameBatch.push(debris)
                                debrisOfSameBatchKeys.push(key)
                            }
                        }

                        debrisOfSameBatch.forEach(debris => {
                            Matter.Composite.removeBody(engine.world, debris)
                        })

                        debrisOfSameBatchKeys.forEach(key => {
                            delete entities[key]
                        })

                        curScore += 1

                    } else { //lose the game

                        //engine.dispatch({ type: "game-over"});
                        Alert.alert('OH NOOOO!', 'game over');
                        setIsRunning(false)
                        curScore = 0
                        Object.keys(entities).forEach(key => {

                            const debris = entities[key] ? entities[key].body : null
                            if (debris) {
                                Matter.Body.set(debris, {
                                    isStatic: true
                                });
                            }

                            
                        })

                        

                    }
                    setScore(curScore)

                }
            }

        }


    });
}

const checkOhNo = (pointer, collidingDebris) => { //pointer and collidingDebris are entities's properties
    const pointerColor = pointer.color
    const pointerShape = pointer.body.type

    const debrisColor = collidingDebris.color
    const debrisShape = collidingDebris.body.type

    if ((pointerColor !== debrisColor) && (pointerShape !== debrisShape)) {
        return true //Oh No --> lose the game
    }

    return false
}

//in the case of passing the Oh--No check
const getPointerNextProp = (pointer, collidingDebris) => { //pointer and collidingDebris are entities's properties
    const pointerColor = pointer.color
    const pointerShape = pointer.body.type

    const debrisColor = collidingDebris.color
    const debrisShape = collidingDebris.body.type
    if (pointerColor === debrisColor) { //same color, change pointer's shape to debris's shape
        const pointerNewBody = createBody({
            ...POINTER_INITIAL_PROPS,
            position: {
                xPos: pointer.body.position.x - DEBRIS_SPAN / 2,
                yPos: pointer.body.position.y - DEBRIS_SPAN / 2
            },
            shape: debrisShape
        })
        return ({       //NOTE: WHEN CHANGING BODY, WE NEED TO REMOVE IT FROM WORLD, CREATE A NEW BODY, ADD BACK TO WORLD, AND DO THE SAME IN THE ENTITIES 
            body: pointerNewBody,
            color: pointerColor,
        })
    } else if (pointerShape === debrisShape) { //same shape, change pointer's shape to debris's shape
        return ({ //WHEN CHANGING COLOR, WE ONLY NEED TO REPLACE THE POINTER IN THE ENTITY WITH NEW PROP
            body: pointer.body,
            color: debrisColor,
        })
    } else {
        return ({
            body: pointer.body,
            color: pointerColor
        })
    }
}