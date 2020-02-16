import React from 'react';
import { ImageBackground, Text, Platform, StyleSheet } from 'react-native';

export default function TitleBar({
    title
}){
    return(
        <ImageBackground
            source={require('../assets/title_background.jpg')}
            style={styles.container}
            imageStyle={styles.image}
        >
            <Text style={styles.text}>
                {title}
            </Text>
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    container: {
        height: 40,
        alignItems: 'stretch',
        justifyContent: 'center',
        //borderColor: 'blue',
        //borderWidth: 1
    },
    image: {
        flex: 1,
        height: null, 
        width: null,

    },
    text: {
        fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
        left: 20,
        textAlignVertical: 'center'

    }
})