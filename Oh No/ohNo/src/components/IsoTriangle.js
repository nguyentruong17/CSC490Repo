import React from 'react';
import { View } from 'react-native'

export default IsoTriangle = (props) => {
    const { position, size, preStyle, color } = props
    const { x, y } = position
    const { base, height } = size
    const left = x - base/2
    const top = y - 2*height/3

    return (
        <View
            style={
                {
                    ...preStyle,
                    left,
                    top,
                    width: 0,
                    height: 0,
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderLeftWidth: base/ 2,
                    borderRightWidth: base/ 2,
                    borderBottomWidth: base,
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: color,
                }
            }

        />
    )
}