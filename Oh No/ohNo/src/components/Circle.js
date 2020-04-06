import React from 'react';
import { View } from 'react-native'

export default Circle = (props) => {
    const { position, diameter, preStyle, color } = props
    const { x, y } = position
    const left = x - diameter/2
    const top = y - diameter/2

    return (
        <View
            style={
                {
                    ...preStyle,
                    left,
                    top,
                    width: diameter,
                    height: diameter,
                    borderRadius: diameter*2,
                    backgroundColor: color,
                }
            }

        />
    )
}