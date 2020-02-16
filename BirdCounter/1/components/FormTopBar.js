import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default function NavigationBar({
    title,
    closingText,
    onPressClosingText
}){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.closingText} onPress={onPressClosingText}>
                <Text style={{color: 'white'}}>{closingText}</Text>  
            </TouchableOpacity>
        </View>
    )
};

NavigationBar.propTypes = {
    title: PropTypes.string.isRequired,
    closingText: PropTypes.string.isRequired,
    onPressClosingText: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        height: 45,
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    closingText: {
        position: 'absolute',
        left: 10,
        justifyContent: 'center'
    }
})