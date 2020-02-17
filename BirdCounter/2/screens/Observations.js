import React from'react';
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import FormTopBar from '../components/FormTopBar'

export default function Observations({
    birdInfo,
    onPressClosingText,
    onAddObservation,
    onRemoveObservation
}){    
    const timesObserved = birdInfo.timesObserved || 0

    return(
        <View style={styles.container}>

            <FormTopBar 
                title={birdInfo.name}
                //closingText={closingText}
                onPressClosingText={onPressClosingText}
            />

            <SafeAreaView style={styles.bodyContainer}>
                <View style={styles.dataContainer}>
                    <Text style={styles.timesObservedText}>
                        {timesObserved}
                    </Text>

                    <Text style={styles.observationsText}>
                        {timesObserved <= 1 ? 'Observation' : 'Observations'}
                    </Text>
                    
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity
                        style={styles.button1}
                        onPress={onAddObservation}
                    >
                        <Text style={styles.button1Text}> 
                            + 
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button2}
                        onPress={onRemoveObservation}
                    >
                        <Text style={styles.button2Text}> 
                            -
                        </Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
        
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'

    },
    bodyContainer: {
        flex: 1
    },
    dataContainer: {
        height: "70%",
        alignItems: "stretch",
        justifyContent: "center"
    },
    timesObservedText: {
        fontSize: 80,
        fontWeight: 'bold',
        color: 'white',
        //textDecorationLine: 'underline',
        textAlign: 'center',
        textAlignVertical: 'bottom',

    },
    observationsText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'top',

        
    },
    buttonsContainer: {
        height: "30%",
        paddingHorizontal: "10%"
    },
    button1: {
        height: "70%",
        alignItems: "stretch",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: 'rgba(250, 190, 88, 1)',
        marginBottom: 5
    },
    button2: {
        height: "30%",
        alignItems: "stretch",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: 'rgba(34, 49, 63, 1)'

    },
    button1Text: {
        flex: 1,
        fontSize: 40,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    button2Text: {
        flex: 1,
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})

