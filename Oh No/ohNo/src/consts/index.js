import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const NUM_ROWS = 4
export const PADDING = width * (2/100)

export const DEBRIS_SPAN = (width - PADDING * NUM_ROWS *2) / NUM_ROWS
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
    label: LABELS.POINTER,

}

export const DEBRIS_SETTINGS = {
    isStatic: false,
    label: LABELS.DEBRIS,
}

export const FLOOR_SETTINGS = {
    isStatic: true,
    label: LABELS.FLOOR,
}