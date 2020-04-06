import React from 'react';
import { StyleSheet } from 'react-native'

import {
    DEBRIS_SPAN,
    DEBRIS_SHAPES,
} from '../consts'

import Rectangle from './Rectangle'
import Circle from './Circle'
import Triangle from './IsoTriangle'           

export default Debris = (props) => {

    const { body, color } = props // body: Matter Body object, color: string
    const { type, position } = body // type: string, position: object

    const { SQUARE, CIRCLE, TRIANGLE } = DEBRIS_SHAPES

    const debris = (function (type) {
        switch (type) {
            case TRIANGLE: {
                return (
                    <Triangle
                        position={position}
                        size={{ base: DEBRIS_SPAN, height: DEBRIS_SPAN }}
                        preStyle={styles.general}
                        color={color}
                    />

                )
            }

            case CIRCLE: {
                return (
                    <Circle
                        position={position}
                        diameter={DEBRIS_SPAN}
                        preStyle={styles.general}
                        color={color}

                    />

                )
            }


            default: {  //default is square
                return (
                    <Rectangle
                        position={position}
                        size={{ width: DEBRIS_SPAN, height: DEBRIS_SPAN }}
                        preStyle={styles.general}
                        color={color}
                        draggable
                        onDrag
                    />

                )
            }
        }
    })(type);

    

    return debris
}


const styles = StyleSheet.create({
    general: {
        position: "absolute",
    }
});