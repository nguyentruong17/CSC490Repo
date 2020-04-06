// /https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

// https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
export const getRandomProperty = (obj) => {
    const  keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};

