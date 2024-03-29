import React from 'react';
import { FlatList, Dimensions, PixelRatio } from 'react-native';
import PropTypes from 'prop-types';

import Card from './Card'

export default class CardGrid extends React.Component{
    renderGridItem = (itemInfo) => {

        const { onTitlePress, onImagePress, itemsPerRow,spaceBetweenItems } = this.props
        
        const { item, index } = itemInfo

        const { width } = Dimensions.get('window')

        const size = PixelRatio.roundToNearestPixel(
            (width - spaceBetweenItems * (itemsPerRow-1)) / itemsPerRow
            // because if we have 3 items, we're gonna have 3-1 = 2 blank spaces between our items
        )
        
        //we don't want any space/margin to the left of our first item on each row
        const marginLeft = index % itemsPerRow === 0 ? 0 : spaceBetweenItems

        //we dont't want our first-row items to include the margin top
        const marginTop = index < itemsPerRow ? 0 : spaceBetweenItems


        return (<Card 
            title = {item.name}
            imageSource = {item.imgScr}
            imageWidth = {size}
            paddingStyles = {{marginTop: marginTop, marginLeft: marginLeft}}
            onTitlePress = {() => onTitlePress(item.id)}
            onImagePress = {() => onImagePress(item.id)}
        />)

    }
    
    render() {
        const { items, itemsPerRow } = this.props;
        return(
            <FlatList
                data={items}
                renderItem={this.renderGridItem}
                keyExtractor={item => item.id.toString()}
                numColumns={itemsPerRow}
    
            />
        )
    }
}

CardGrid.propTypes = {
    items: PropTypes.array,
    onTitlePress: PropTypes.func.isRequired,
    onImagePress: PropTypes.func.isRequired,

}