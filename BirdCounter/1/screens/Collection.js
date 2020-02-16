import React from'react';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import CardGrid from '../components/CardGrid'
import UserInfo from '../components/Board/UserInfo'

export default class Collection extends React.Component{
    
    render() {
        const { 
            height, 
            avatarImgSrc, 
            userInfo, 
            onAvatarPress, 
            containerPaddingPercent,
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
                    avatarImgSrc={avatarImgSrc}
                    userInfo={userInfo}
                    onAvatarPress={onAvatarPress}
                    containerPaddingPercent={containerPaddingPercent}
                />
                {
                <CardGrid
                    items={birds}
                    onTitlePress={onTitlePress} 
                    onImagePress={onImagePress}
                    itemsPerRow={3}
                    spaceBetweenItems={3}
                />

                }


            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
