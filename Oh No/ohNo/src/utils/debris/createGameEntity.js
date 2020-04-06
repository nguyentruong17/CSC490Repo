import React from 'react'
import Debris from '../../components/Debris'

export default createGameEntity = (props) => {
    const { body, color } = props
    return ({
        body,
        color,
        renderer: Debris
    })
}