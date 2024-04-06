import Color from 'colorjs.io'

import Tile from '../Tile.js'
import Blend from '../Blend.js'

export default function RectanglePyramid() {

    let width = 5
    let height = 7

    let tiles = []
    let index = 0

    // Generate Rectangle

    let top = Blend(null, null, width)
    let bottom = Blend(null, null, width)
    let right = Blend(top[width-1], bottom[0], height)
    let left = Blend(top[0], bottom[width-1], height)

    top.forEach((color, i) => {tiles.push(
        new Tile(index++, color.toString(), {x: i, y: 0})
    )})
    
    right.pop()
    right.shift()
    right.forEach((color, i) => {tiles.push(
        new Tile(index++, color.toString(), {x: width-1, y: i + 1})
    )})

    bottom.forEach((color, i) => {tiles.push(
        new Tile(index++, color.toString(), {x: (width - 1) - i, y: height-1})
    )})   

    left.pop()
    left.shift()
    left.forEach((color, i) => {tiles.push(
        new Tile(index++, color.toString(), {x: 0, y: i + 1})
    )})

    let peak = new Color('srgb', [Math.random(), Math.random(), Math.random()])

    tiles.push(new Tile(
        index++,
        peak.toString(),
        {x: 2, y: 3},
    ))

    tiles.push(new Tile(
        index++,
        peak.mix(right[0], 0.5, {space: "oklab", outputSpace: "srgb"}).toString(),
        {x: 3, y: 2},
    ))

    tiles.push(new Tile(
        index++,
        peak.mix(right[3], 0.5, {space: "oklab", outputSpace: "srgb"}).toString(),
        {x: 3, y: 3},
    ))       
    
    tiles.push(new Tile(
        index++,
        peak.mix(right[right.length-1], 0.5, {space: "oklab", outputSpace: "srgb"}).toString(),
        {x: 3, y: 4},
    ))        

    

    return tiles.flat()

}