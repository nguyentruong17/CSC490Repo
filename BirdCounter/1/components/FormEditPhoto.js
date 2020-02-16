import React from 'react'
import { View, Image, ActivityIndicator, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class FormEditPhoto extends React.Component{
    state = {
        loading: true
    }

    handleOnLoad= () => {
        this.setState({
            loading: false
        })
    }

    render() {
        const {  imgSrc, onPressChangeImg } = this.props;
        const { loading } = this.state;

        const { width } = Dimensions.get('window')
        
        const imageStyle = {
            width: width * .5,
            height: width * .5,
            borderRadius: width * .5 / 2, //this makes our View to be shaped as a circle
        };

        const padding = width*.5/2


        return(

            <View style={styles.container}>
            
                <View style={[styles.imageContainer, {height: imageStyle.height}]}>
                    {loading && (
                        <ActivityIndicator style={StyleSheet.absoluteFill} size='large' />
                    )}
                
                <Image
                    source={imgSrc}
                    style={imageStyle}
                    onLoad={this.handleOnLoad}
                />
                </View>

                <TouchableOpacity
                    style = {[styles.button, {marginHorizontal: padding}]}
                    onPress = {onPressChangeImg}
                >
                    <Text style={styles.btnText}>
                        Change Photo
                    </Text>
                </TouchableOpacity>

               
            </View>
            
        )
    }

}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        //borderColor: 'red',
        //borderWidth: 1
    },
    imageContainer: {
        
        marginVertical: 15,
        overflow: 'hidden',
        //borderColor: 'blue',
        //borderWidth: 1
    },
    imageStyle: {
        flex: 1,
        resizeMode: 'contain'
    },
    button: {
        height: 30,
        marginBottom: 25
        //borderColor: 'blue',
        //borderWidth: 1
    },
    btnText: {
        flex: 1,
        color: 'rgba(44, 130, 201, 1)',
        textAlignVertical: 'center'
    }
})