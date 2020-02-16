import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'

export default class UserInfoRow extends React.Component {
    state = {
        loading: true,
    }

    handleOnLoad = () => {
        this.setState({ loading: false })
    }

    render() {

        const { height, avatarImgSrc, userInfo, onAvatarPress } = this.props

        const imageStyle = {
            width: height * .8,
            height: height * .8,
            borderRadius: height * .8 / 2, //this makes our View to be shaped as a circle
        };
        return (


            //row direction 
            <View style={[styles.container, {height: height}]}>
                {/* changable avatar image */}
                <TouchableOpacity
                    style={styles.imageContainer}
                    onPress={onAvatarPress}
                >
                    <Image
                        style={imageStyle}
                        source={avatarImgSrc}
                        onLoad={this.handleOnLoad}
                    />
                </TouchableOpacity>

                <View
                    style={[styles.textContainer, {height: imageStyle.height}]}
                >
                    <View style={{height: '50%'}}>
                        <Text style={[styles.text, styles.dataText]}>{userInfo.numBirds}</Text>
                    </View>
                    <Text style={[styles.text, styles.staticText]}>Birds</Text>

                </View>

                
                <View
                    style={[styles.textContainer, {height: imageStyle.height}]}
                >
                    <View style={{height: '50%'}}>
                        <Text style={[styles.text, styles.dataText]}>{userInfo.numObservations}</Text>
                    </View>
                    
                    <Text style={[styles.text, styles.staticText]}>Observations</Text>

                </View>


            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        //borderColor: 'red',
        //borderWidth: 2
    },
    imageContainer: {
        overflow: 'hidden'
    },
    imageStyle: {
        flex: 1,
        resizeMode: 'center'
    },
    textContainer: {
        //borderColor: 'blue',
        //borderWidth: 1
    },
    text: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        //borderColor: 'green',
        //borderWidth: 1
    },
    dataText: {
        flex: 1, 
        fontWeight: 'bold', 
        fontSize: 20,
        textAlignVertical: 'bottom'
    },
    staticText: {
        fontSize: 10,
        textAlignVertical: 'top'
    }

})