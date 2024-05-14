import makeColor from './makeColor'
import getDifferentColor from './getDifferentColor'

const makeBlend = (start = null, end = null, {length = 5, difference = 0.3, exclude = false}) => {
    console.log(difference)
    start = start ? start : makeColor()
    end = end ? end : getDifferentColor(start, difference)

    let blend = start.steps(end, {
        space: "oklab",
        outputSpace: "oklab",
        steps: length            
    })

    if( exclude ) { blend.pop(); blend.shift()}

    return blend
    
}

export default makeBlend