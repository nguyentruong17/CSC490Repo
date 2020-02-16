import React from 'react';
import { SafeAreaView, ViewPropTypes, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import FormTopBar from '../components/FormTopBar';
import FormEditPhoto from '../components/FormEditPhoto';
import FormEditInput from '../components/FormEditInput';

export default class EditProfile extends React.Component{

    render(){
        const { userInfo, onPressClosingText, onPressChangeImg, onSubmitText } = this.props;
        return(
            <SafeAreaView style={styles.container}>
                <FormTopBar
                    title='Edit'
                    closingText='<'
                    onPressClosingText={onPressClosingText}
                />
                <FormEditPhoto
                    imgSrc={userInfo.imgSrc}
                    onPressChangeImg={onPressChangeImg}
                />
                <FormEditInput
                    title={'User Name'}
                    textToEdit={userInfo.name} 
                    onSubmitText={onSubmitText}
                />
                <FormEditInput
                    title={'Bio'}
                    textToEdit={userInfo.bio} 
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
