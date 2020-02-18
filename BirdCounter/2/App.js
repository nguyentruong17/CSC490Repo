import React from 'react';
import { View, Dimensions, Modal, StyleSheet, AsyncStorage } from 'react-native';

import TitleBar from './components/TitleBar'
import Collection from './screens/Collection'
import Observations from './screens/Observations'
import EditBird from './screens/EditBird'
import EditProfile from './screens/EditProfile'

import generateBirds from './utils/generateBirds'
const numBirds = 26

export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            birds: generateBirds(numBirds),
            userInfo: {
                name: 'Nguyen Truong',
                bio: 'Augustana College',
                imgScr: require('./assets/ava.jpg'),
    
                //the last 2 are dynamically calculated thus spreading operator
                //numBirds: Object.keys(birds).length,
                //numObservations: 10
            },
            selectedId: null,
            showObservations: false,
            showEditBird: false,
            showEditProfile: false
        }
    }

    

    componentDidMount() {

        //dynamically calculated properties for userInfo, which are numBirds and numObservations
        const { birds, userInfo } = this.state;

        const numBirds = Object.keys(birds).length;
        let numObservations = 0
        Object.values(birds).map(each => {
            if (each.timesObserved) {
                numObservations += each.timesObserved
            }
        })


        this.setState({
            userInfo: {
                ...userInfo,
                numBirds,
                numObservations
            }
        })
    };
    
    
    handleSelectBird = id => {
        this.setState({
            selectedId: id
        })
    };

    handlePressCardImg = id => {
        this.handleSelectBird(id);
        
        this.setState({
            showObservations: true
        })
    };

    handlePressCardTitle = id => {
        this.handleSelectBird(id);

        this.setState({
            showEditBird: true
        })
    }

    handleRequestCloseForm = () => {
        this.setState({
            showObservations: false,
            showEditBird: false,
            showEditProfile: false
        })
    }

    handleAddObservation = () => {
        const { selectedId, birds, userInfo } = this.state;
        const birdAtId = birds[selectedId]
        const observations  = birdAtId.timesObserved || 0

        const { numObservations }  = userInfo
        
        this.setState({
            birds: {
                ...birds,
                [selectedId]: {
                    ...birdAtId,
                    'timesObserved': observations+1
                }
            },
            userInfo: {
                ...userInfo,
                numObservations: numObservations+1

            }
        })
    }

    handlePressAva = () => {

    }

    handleRemoveObservation = () => {
        const { selectedId, birds, userInfo } = this.state;
        const birdAtId = birds[selectedId]
        const observations  = birdAtId.timesObserved || 0
        
        const { numObservations }  = userInfo

        this.setState({
            birds: {
                ...birds,
                [selectedId]: {
                    ...birdAtId,
                    'timesObserved': observations === 0 ? 0 : observations-1
                }
            },
            userInfo: {
                ...userInfo,
                numObservations: numObservations === 0 ? 0 : numObservations-1

            }
        })
    }

    handleChangeBirdName = (newName) => {
        const { selectedId, birds } = this.state;
        const birdAtId = birds[selectedId]
        //const observations  = birdAtId.timesObserved || 0

        
        this.setState({
            birds: {
                ...birds,
                [selectedId]: {
                    ...birdAtId,
                    'name': newName
                }
            }
        })
    }

    handleSelectUser = () => {
        this.setState({
            showEditProfile: true
        })
    }

    handleChangeUserName = (newName) => {
        const { userInfo } = this.state;
        this.setState({
            userInfo: {
                ...userInfo,
                name: newName
            }
        })
    }

    handleChangeUserBio = (newBio) => {
        const { userInfo } = this.state;
        this.setState({
            userInfo: {
                ...userInfo,
                bio: newBio
            }
        })
    }



    render() {
        const { height } = Dimensions.get('window');
        const { birds, userInfo, selectedId, showObservations, showEditBird, showEditProfile } = this.state;
        console.log(birds)
        return(
            <View
                style={styles.container}
            >

                <TitleBar
                    title='B I R D W A T C H E R'
                />

                <Collection
                    height = {height*.3}
                    userInfo = {userInfo}
                    onAvatarPress = {this.handleSelectUser}
                    
                    birds = {Object.values(birds)}
                    onTitlePress = {this.handlePressCardTitle} 
                    onImagePress = {this.handlePressCardImg}
                
                />

                <Modal 
                    visible={showObservations}
                    animationType='slide'
                    onRequestClose={this.handleRequestCloseForm}
                >
                    <Observations
                        birdInfo = {birds[selectedId]}
                        onPressClosingText = {this.handleRequestCloseForm}
                        onAddObservation = {this.handleAddObservation}
                        onRemoveObservation = {this.handleRemoveObservation}

                    />
                    
                </Modal>

                <Modal 
                    visible={showEditBird}
                    animationType='slide'
                    onRequestClose={this.handleRequestCloseForm}
                >
                    <EditBird
                        birdInfo = {birds[selectedId]}
                        onPressChangeImg = {() => console.log('Change Image Pressed')}
                        onSubmitText = {this.handleChangeBirdName}
                        onPressClosingText = {this.handleRequestCloseForm}
                    />

                    
                </Modal> 

                <Modal 
                    visible={showEditProfile}
                    animationType='slide'
                    onRequestClose={this.handleRequestCloseForm}
                >

                    <EditProfile
                        userInfo={userInfo}
                        onPressClosingText={this.handleRequestCloseForm}
                        onPressChangeImg = {console.log('Change Avatar Pressed!')}
                        onSubmitNewName = {this.handleChangeUserName}
                        onSubmitNewBio = {this.handleChangeUserBio}
                    />
                    
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