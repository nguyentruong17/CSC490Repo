import React from 'react';
import { SafeAreaView, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import FormTopBar from '../components/FormTopBar';
import FormEditPhoto from '../components/FormEditPhoto';
import FormEditInput from '../components/FormEditInput';

export default class EditBird extends React.Component{

    render(){
        const { birdInfo, onPressClosingText, onPressChangeImg, onSubmitText } = this.props;
        return(
            <SafeAreaView style={styles.container}>
                <FormTopBar
                    title='Edit'
                    //closingText='<'
                    onPressClosingText={onPressClosingText}
                />
                <FormEditPhoto
                    imgScr={birdInfo.imgScr}
                    onPressChangeImg={onPressChangeImg}
                />
                <FormEditInput
                    title={'Bird Name'}
                    textToEdit={birdInfo.name} 
                    onSubmitText={onSubmitText}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'black',
        backgroundColor: 'black'
    }
})
