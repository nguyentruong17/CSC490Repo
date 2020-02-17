import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import UserInfoRow from './UserInfoRow'

export default function UserInfo({
    height,
    avatarImgSrc,
    userInfo,
    onAvatarPress,
    containerPaddingPercent
}){
    const containerStyle = {
        height: height,
        paddingHorizontal: containerPaddingPercent
    }
    return(
        <View style={[styles.container, containerStyle]}>
            <UserInfoRow
                height={height*.6}
                userInfo={userInfo}
                onAvatarPress={onAvatarPress}
            />

            <TouchableOpacity
                style={{flex: 1, height: height*.3, paddingBottom: height*.2*.1}}
            >
                <Text style={{color: 'white', textAlignVertical: 'top', fontWeight: 'bold', }}>{userInfo.name}</Text>
                <Text style={{color: 'white', textAlignVertical: 'top',}}>{userInfo.bio}</Text>
            </TouchableOpacity>

            <View
                style = {[styles.collectionBar]}
            >
                <Text
                    style={styles.colletionText}
                >
                    My Collection
                </Text>

            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        //borderColor: 'yellow',
        //borderWidth: 3
        marginBottom: 10

    },
    collectionBar: {
        height: 30,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderRadius: 5,
        borderColor: 'rgba(192, 192, 192, 0.5)',
        borderWidth: 1,
    },
    colletionText: {
        flex: 1,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'

    }
})