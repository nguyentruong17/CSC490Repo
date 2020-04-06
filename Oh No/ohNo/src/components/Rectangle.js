import React from 'react';
import { View } from 'react-native'

export default Rectangle = (props) => {
    const { position, size, preStyle, color } = props;
    const { x, y } = position
    const { width, height } = size
    const left = x - width/2
    const top = y - height/2

    return (
        <View
            style={
                {
                    ...preStyle,
                    left,
                    top,
                    width: width,
                    height: height,
                    backgroundColor: color
                }
            }

        />
    )
}