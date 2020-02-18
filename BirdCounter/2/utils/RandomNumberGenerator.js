//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export default function RandomNumberGenerator(max) {
    return Math.floor(Math.random() * Math.floor(max));
}