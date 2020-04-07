import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

import { getRandomInt, getRandomNumber, getRandomProperty } from '../utils/RandomGenerator';

export const NUM_ROWS = 4
export const PADDING = width * (2 / 100)

export const DEBRIS_SPAN = (width - PADDING * NUM_ROWS * 2) / NUM_ROWS
export const FLOOR_HEIGHT = height * 0.15


export const OBJECT_SHAPES = {
    ...DEBRIS_SHAPES,
    RECTANGLE: 'RECTANGLE',
}

export const DEBRIS_SHAPES = {
    SQUARE: 'SQUARE',
    CIRCLE: 'CIRCLE',
    //TRIANGLE: 'TRIANGLE',
}


export const DEBRIS_COLORS = {
    RED: 'rgb(255,0,0)',
    GREEN: 'rgb(0,128,0)',
    BLUE: 'rgb(0,0,255)'
}

export const LABELS = {
    POINTER: 'POINTER',
    DEBRIS: 'DEBRIS',
    FLOOR: 'FLOOR'
}

export const POINTER_SETTINGS = {
    isStatic: false,
    restitution: 0,
    label: LABELS.POINTER,

}

export const DEBRIS_SETTINGS = {
    isStatic: false,
    restitution: 0,
    label: LABELS.DEBRIS,
}

export const FLOOR_SETTINGS = {
    isStatic: true,
    label: LABELS.FLOOR,
}

export const POINTER_INITIAL_PROPS = {
    shape: 'SQUARE',
    settings: {
        density: 50,
        friction: 0.5,
        ...POINTER_SETTINGS
    },
    position: {
        xPos: (width - DEBRIS_SPAN) / 2,
        yPos: height - FLOOR_HEIGHT - DEBRIS_SPAN
    },
}

export const DEBRIS_INITIAL_PROPS = {

    shape: getRandomProperty(DEBRIS_SHAPES),
    rowNum: 0,
    settings: {
        frictionAir: getRandomNumber(0.01, 0.03),
        ...DEBRIS_SETTINGS
    },
    position: {
        yPos: 0
    }

}

