import React from 'react';
import { View, Dimensions, Modal, StyleSheet } from 'react-native';



import TitleBar from './components/TitleBar'
import Collection from './screens/Collection'
import Observations from './screens/Observations'
import FormEditPhoto from './components/FormEditPhoto'
import FormEditInput from './components/FormEditInput'
import EditProfile from './screens/EditProfile'


const ava = require('./assets/kiwi.jpg')
const birds = [
    {
        id: 0,
        name: 'Loon',
        imgSrc: require('./assets/loon.jpg'),
        timesObserved: 1

    },
    {
        id: 1,
        name: 'Merlin',
        imgSrc: require('./assets/merlin.jpg'),
    },
    {
        id: 2,
        name: 'Nighthawk',
        imgSrc: require('./assets/nighthawk.jpg')
    },
    {
        id: 3,
        name: 'Oriole',
        imgSrc: require('./assets/oriole.jpg'),
    },
    {
        id: 1,
        name: 'Puffin',
        imgSrc: require('./assets/puffin.jpg'),
    },
    {
        id: 1,
        name: 'Quail',
        imgSrc: require('./assets/quail.jpg'),
    },
]

const userInfo = {
    name: 'Nguyen Truong',
    bio: 'Augustana College',
    imgSrc: require('./assets/kiwi.jpg'),
    numBirds: birds.length,
    numObservations: 10
}


export default class App extends React.Component{
    state = {
        showObservations: false,
        showEditBird: false,
        showEditProfile: false
    };


    render() {
        const { height } = Dimensions.get('window');
        const { showObservations, showEditBird, showEditProfile } = this.state;
        return(
            <View
                style={styles.container}
            >

                <TitleBar
                    title='B I R D W A T C H E R'
                />

                <Collection
                    height = {height*.3} 
                    avatarImgSrc = {ava}
                    userInfo = {userInfo}
                    onAvatarPress = {()=>console.log('Ava Pressed!')}
                    containerPaddingPercent = {"5%"}
                    birds = {birds}
                    onTitlePress = {()=>console.log('Title Pressed!')} 
                    onImagePress = {()=>console.log('Image Pressed!')}
                
                />

                <Modal 
                    visible={showObservations}
                    animationType='slide'
                    onRequestClose={()=>console.log('Close Requested!')}
                >
                    
                </Modal>

                <Modal 
                    visible={showEditBird}
                    animationType='slide'
                    onRequestClose={()=>console.log('Close Requested!')}
                >
                    
                </Modal> 

                <Modal 
                    visible={showEditProfile}
                    animationType='slide'
                    onRequestClose={()=>console.log('Close Requested!')}
                >
                    
                </Modal> 

                <Modal 
                    visible={showObservations}
                    animationType='slide'
                    onRequestClose={()=>console.log('Close Requested!')}
                >
                    
                </Modal>  
                
                
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.85)'
    }
})