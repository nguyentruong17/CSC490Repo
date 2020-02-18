import uuidv4 from 'uuid/v4';

const names = ['Anhinga', 'Bluebird', 'Chickadee', 'Dove', 'Egret', 'Falcon', 'Gallinule', 'Hummingbird', 'Ibis', 'Jay', 'Kingfisher',
    'Loon', 'Merlin', 'Nighthawk', 'Oriole', 'Puffin', 'Quail',
    'Razorbill', 'Skimmer', 'Tanager', 'Uguisu', 'Violetear', 'Woodpecker', 'Xenops', 'Yellowlegs', 'Zanzibar'
]

const sources= [
    require('../assets/anhinga.jpg'),
    require('../assets/bluebird.jpg'),
    require('../assets/chickadee.jpg'),
    require('../assets/dove.jpg'),
    require('../assets/egret.jpg'),
    require('../assets/falcon.jpg'),
    require('../assets/gallinule.jpg'),
    require('../assets/hummingbird.jpg'),
    require('../assets/ibis.jpg'),
    require('../assets/jay.jpg'),
    require('../assets/kingfisher.jpg'),
    require('../assets/loon.jpg'),
    require('../assets/merlin.jpg'),
    require('../assets/nighthawk.jpg'),
    require('../assets/oriole.jpg'),
    require('../assets/puffin.jpg'),
    require('../assets/quail.jpg'),
    require('../assets/razorbill.jpg'),
    require('../assets/skimmer.jpg'),
    require('../assets/tanager.jpg'),
    require('../assets/uguisu.jpg'),
    require('../assets/violetear.jpg'),
    require('../assets/woodpecker.jpg'),
    require('../assets/xenops.jpg'),
    require('../assets/yellowlegs.jpg'),
    require('../assets/zanzibar.jpg'),
]



// scr: MDN JS Tutorial
// return a random int [1, max]
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))+1;
}

function getId(){
    return uuidv4()
}


export default function generateBirds(numBirds){
    if (numBirds > 26) {
        numBirds = 26
    }
    let birds = {}
    //let ids = []

    for (let i=0; i < numBirds; i++){
        const birdId = getId()
        birds[birdId] = {
            id: birdId,
            name: names[i],
            imgScr: sources[i],
            timesObserved: getRandomInt(15)

        }
    }

    return birds
}