import Color from 'colorjs.io'

import Tile from '../Tile.js'
import Blend from '../Blend.js'

export default function Square() {
    
    let tiles = []

    let topLeft = new Color('srgb', [Math.random(), Math.random(), Math.random()])
    let topRight = new Color('srgb', [Math.random(), Math.random(), Math.random()])
    let bottomLeft = new Color('srgb', [Math.random(), Math.random(), Math.random()])
    let bottomRight = new Color('srgb', [Math.random(), Math.random(), Math.random()])
    
    let top = Blend(topLeft, topRight, 3)
    top.forEach((color, i) => {tiles.push(
        new Tile(i, color.toString(), {x: i, y: 0})
    )})

    let bottom = Blend(bottomLeft, bottomRight, 3)
    bottom.forEach((color, i) => {tiles.push(
        new Tile(6 + i, color.toString(), {x: i, y: 2})
    )})

    tiles.push(new Tile(
        3,
        topLeft.mix(bottomLeft, 0.5, {space: "oklab", outputSpace: "srgb"}).toString(),
        {x: 0, y: 1}
    ))

    tiles.push(new Tile(
        5,
        topRight.mix(bottomRight, 0.5, {space: "oklab", outputSpace: "srgb"}).toString(),
        {x: 2, y: 1}
    ))

    let mix1 = topLeft.mix(bottomRight, 0.5, {space: "oklab", outputSpace: "srgb"})
    let mix2 = topRight.mix(bottomLeft, 0.5, {space: "oklab", outputSpace: "srgb"})
    
    tiles.push(new Tile(
        4,
        mix1.mix(mix2, 0.5, {space: "oklab", outputSpace: "srgb"}).toString(),
        {x: 1, y: 1}
    ))    

    return tiles.flat()

}