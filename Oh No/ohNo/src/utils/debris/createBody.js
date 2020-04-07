import Matter from "matter-js";
import { Dimensions } from 'react-native'
const { width } = Dimensions.get('window')

import {
    NUM_ROWS,
    DEBRIS_SPAN,
    PADDING,
    DEBRIS_SHAPES,
} from '../../consts'

export default createBody = (props) => {
    const { shape, settings, rowNum, position } = props;

    const { SQUARE, CIRCLE, TRIANGLE } = DEBRIS_SHAPES

    const xPos = (rowNum || rowNum === 0) ? width / NUM_ROWS * rowNum + PADDING : position.xPos
    const { yPos } = position

    const newSettings = {
        ...settings,
        type: shape,
    }

    switch (shape) {
        case TRIANGLE: {
            return (
                Matter.Bodies.polygon(xPos + DEBRIS_SPAN/2, yPos + 2*DEBRIS_SPAN/3, 3, 2*DEBRIS_SPAN/3, 
                    newSettings

                )
            )
        }

        case CIRCLE: {
            return (
                Matter.Bodies.circle(xPos + DEBRIS_SPAN/2, yPos + DEBRIS_SPAN/2, DEBRIS_SPAN/2, 
                    newSettings
                )
            )
        }


        default: {  //default is square
            return (
                Matter.Bodies.rectangle(xPos + DEBRIS_SPAN/2, yPos + DEBRIS_SPAN/2, DEBRIS_SPAN, DEBRIS_SPAN, 
                    newSettings
                )
            )

        }
    }


}