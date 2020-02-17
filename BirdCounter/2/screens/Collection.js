import React from'react';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import CardGrid from '../components/CardGrid'
import UserInfo from '../components/Board/UserInfo'

const containerPaddingPercent = '5%'
const itemsPerRow = 3
const spaceBetweenItems =3

export default class Collection extends React.Component{
    
    render() {
        const { 
            height,
            userInfo, 
            onAvatarPress, 
            //containerPaddingPercent,
            birds,
            onTitlePress,
            onImagePress

        } = this.props;
             
        return(
            <SafeAreaView
                style={styles.container}
            >
                
                <UserInfo
                    height={height}
                    userInfo={userInfo}
                    onAvatarPress={onAvatarPress}
                    containerPaddingPercent={containerPaddingPercent}
                />
                
                <CardGrid
                    items={birds}
                    onTitlePress={onTitlePress} 
                    onImagePress={onImagePress}
                    itemsPerRow={itemsPerRow}
                    spaceBetweenItems={spaceBetweenItems}
                />


            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
