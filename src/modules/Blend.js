import Color from 'colorjs.io'

export default function Blend(start = null, end = null, width, exclude = false) {

    start = start ? start : new Color('srgb', [Math.random(), Math.random(), Math.random()])
    end = end ? end : new Color('srgb', [Math.random(), Math.random(), Math.random()])

    let blend = start.steps(end, {
        space: "oklab",
        outputSpace: "srgb",
        steps: width            
    })

    if( exclude ) { blend.pop(); blend.shift()}

    return blend
    
}