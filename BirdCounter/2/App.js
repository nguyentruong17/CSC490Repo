import React from 'react';
import { View, Dimensions, Modal, StyleSheet } from 'react-native';

import TitleBar from './components/TitleBar'
import Collection from './screens/Collection'
import Observations from './screens/Observations'
import EditBird from './screens/EditBird'
import EditProfile from './screens/EditProfile'

import uuidv4 from 'uuid/v4'

const bird0 = uuidv4();
const bird1 = uuidv4();
const bird2 = uuidv4();
const bird3 = uuidv4();
const bird4 = uuidv4();
const bird5 = uuidv4();
const bird6 = uuidv4();



export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            birds: {
                [bird0]: {
                    id: bird0,
                    name: 'Loon',
                    imgScr: require('./assets/loon.jpg'),
                    timesObserved: 15
                },
                [bird1]: {
                    id: bird1,
                    name: 'Merlin',
                    imgScr: require('./assets/merlin.jpg'),
                    timesObserved: 2
                },
                [bird2]: {
                    id: bird2,
                    name: 'Nighthawk',
                    imgScr: require('./assets/nighthawk.jpg'),
                    timesObserved: 3
                },
                [bird3]: {
                    id: bird3,
                    name: 'Oriole',
                    imgScr: require('./assets/oriole.jpg'),
                },
                [bird4]: {
                    id: bird4,
                    name: 'Puffin',
                    imgScr: require('./assets/puffin.jpg'),
                },
                [bird5]: {
                    id: bird5,
                    name: 'Quail',
                    imgScr: require('./assets/quail.jpg'),
                },
            },
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