import React from 'react';
import { 
    View,
    TouchableOpacity, 
    Image,
    ActivityIndicator,
    Text, 
    StyleSheet,  } from 'react-native';
import PropTypes from 'prop-types';



export default class Card extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        imageSource: Image.propTypes.source.isRequired,
        imageWidth: PropTypes.number.isRequired,
        paddingStyles: PropTypes.object,
        onTitlePress: PropTypes.func.isRequired,
        onImagePress: PropTypes.func.isRequired,
    }

    state = {
        loading: true,
    }

    handleOnLoad = () => {
        this.setState({ loading: false })
    }
    0.
    render() {
        const { loading } = this.state
        const { title, imageSource, imageWidth, paddingStyles, onTitlePress, onImagePress } = this.props;

        const containerSizeStyles = {
            width: imageWidth, 
            height: imageWidth+styles.titleContainer.height 
        }
        

        return (
            <View style={[containerSizeStyles, paddingStyles]}>
                
                <TouchableOpacity 
                    style={{flex: 1}}
                    onPress={onImagePress}
                >
                    <View style={styles.imageContainer}>
                        {loading && (
                            <ActivityIndicator style={StyleSheet.absoluteFill} size='small' />
                        )}
                        <Image
                            source={imageSource}
                            style={styles.image}
                            onLoad={this.handleOnLoad}
                            resizeMode='cover'
                        />
                    </View>
                </TouchableOpacity>
                    
                <TouchableOpacity 
                    style={styles.titleContainer}
                    onPress={onTitlePress}
                >
                    <Text style={styles.title}>{title}</Text>
                </TouchableOpacity>

            </View>
        )

    }

}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        aspectRatio: 1
    },
    titleContainer: {
        height: 20,
        alignItems: "stretch",
        justifyContent: "center",
        backgroundColor: "ivory"
    },
    title: {
        flex: 1,
        fontWeight: "300",
        justifyContent: 'center',
        textAlign: 'center',
        textAlignVertical: 'center'
        

    }

})