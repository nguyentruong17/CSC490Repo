import React from 'react';
import { View, Dimensions, Modal, StyleSheet } from 'react-native';

import TitleBar from './components/TitleBar'
import Collection from './screens/Collection'
import Observations from './screens/Observations'
import EditBird from './screens/EditBird'
import EditProfile from './screens/EditProfile'

import RandomNumberGenerator from './utils/RandomNumberGenerator'

import uuidv4 from 'uuid/v4'

const numBirds = 20
let ids = []

    for (let i=0; i < numBirds; i++){
        ids.push(uuidv4())
}

const maxObservationsEachBirds = 15



export default class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            birds: {
                [ids[0]]: {
                    id: ids[0],
                    name: 'Loon',
                    imgScr: require('./assets/loon.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[1]]: {
                    id: ids[1],
                    name: 'Merlin',
                    imgScr: require('./assets/merlin.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[2]]: {
                    id: ids[2],
                    name: 'Nighthawk',
                    imgScr: require('./assets/nighthawk.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[3]]: {
                    id: ids[3],
                    name: 'Oriole',
                    imgScr: require('./assets/oriole.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                    
                },
                [ids[4]]: {
                    id: ids[4],
                    name: 'Puffin',
                    imgScr: require('./assets/puffin.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[5]]: {
                    id: ids[5],
                    name: 'Quail',
                    imgScr: require('./assets/quail.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },

                [ids[6]]: {
                    id: ids[6],
                    name: 'Razorbill',
                    imgScr: require('./assets/razorbill.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[7]]: {
                    id: ids[7],
                    name: 'Skimmer',
                    imgScr: require('./assets/skimmer.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[8]]: {
                    id: ids[8],
                    name: 'Tanager',
                    imgScr: require('./assets/tanager.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[9]]: {
                    id: ids[9],
                    name: 'Uguisu',
                    imgScr: require('./assets/uguisu.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[10]]: {
                    id: ids[10],
                    name: 'Violetear',
                    imgScr: require('./assets/violetear.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[11]]: {
                    id: ids[11],
                    name: 'Woodpecker',
                    imgScr: require('./assets/woodpecker.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },

                [ids[12]]: {
                    id: ids[12],
                    name: 'Xenops',
                    imgScr: require('./assets/xenops.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[13]]: {
                    id: ids[13],
                    name: 'Yellowlegs',
                    imgScr: require('./assets/yellowlegs.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[14]]: {
                    id: ids[14],
                    name: 'Zanzibar',
                    imgScr: require('./assets/zanzibar.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[15]]: {
                    id: ids[15],
                    name: 'Anhinga',
                    imgScr: require('./assets/anhinga.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[16]]: {
                    id: ids[16],
                    name: 'Bluebird',
                    imgScr: require('./assets/bluebird.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[17]]: {
                    id: ids[17],
                    name: 'Chickadee',
                    imgScr: require('./assets/chickadee.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[18]]: {
                    id: ids[18],
                    name: 'Dove',
                    imgScr: require('./assets/dove.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
                },
                [ids[19]]: {
                    id: ids[19],
                    name: 'Egret',
                    imgScr: require('./assets/egret.jpg'),
                    timesObserved: RandomNumberGenerator(maxObservationsEachBirds)+1
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