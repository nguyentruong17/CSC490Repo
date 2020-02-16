import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class FormEditInput extends React.Component{
    
    state = {
        text: this.props.textToEdit,
    };
    handleTextChange = (text) => {
        this.setState({ text });
    };
    handleTextSubmit = () => {
        const { onSubmitText } = this.props;
        const { text } = this.state;

        if(!text) return;

        onSubmitText(text)

        //this.setState({ text: '' });
    };
    render() {
        const { title, textToEdit, onSubmitText } = this.props
        const { text } = this.state;
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    {title}
                </Text>
                <TextInput
                    value={text}
                    underlineColorAndroid='transparent'
                    style={styles.textInput}
                    onChangeText={this.handleTextChange}
                    onSubmitEditing={onSubmitText}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        marginTop: 5,
        paddingHorizontal: 10,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'white',
    },
    title: {
        fontSize: 11,
        color: 'white',
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 0,
        fontSize: 18,
        color: 'white',
    }
})