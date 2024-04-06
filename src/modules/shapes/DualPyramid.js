import Color from 'colorjs.io'

import Tile from '../Tile.js'
import Blend from '../Blend.js'

export default function DualPyramid() {

    let tiles = []
    let index = 0

    let topBase = Blend(null, null, 5)
    let topPeak = new Color('srgb',[Math.random(), Math.random(), Math.random()])

    let bottomBase = Blend(null, null, 5)
    let bottomPeak = new Color('srgb',[Math.random(), Math.random(), Math.random()])   
    
    let left = Blend(topBase[0], bottomBase[0], 4, true)
    let right = Blend(topBase[4], bottomBase[4], 4, true)

    tiles.push(new Tile(index++, topPeak.toString(), {x:2, y:0}))

    tiles.push(new Tile(
        index++,
        topPeak.mix(topBase[0], 0.5, {space: 'oklab', outputSpace:'srgb'}).toString(),
        {x: 1, y: 1}
    ))

    tiles.push(new Tile(
        index++,
        topPeak.mix(topBase[2], 0.5, {space: 'oklab', outputSpace:'srgb'}).toString(),
        {x: 2, y: 1}
    ))  
    
    tiles.push(new Tile(
        index++,
        topPeak.mix(topBase[4], 0.5, {space: 'oklab', outputSpace:'srgb'}).toString(),
        {x: 3, y: 1}
    ))   
    
    topBase.forEach((color, i) => {tiles.push(
        new Tile(index++, color.toString(), {x: i, y: 2})
    )})

    left.forEach((color, i) => {tiles.push(
        new Tile(index++, color.toString(), {x: 0, y: 3 + i})
    )})

    right.forEach((color, i) => {tiles.push(
        new Tile(index++, color.toString(), {x: 4, y: 3 + i})
    )})
    
    bottomBase.forEach((color, i) => {tiles.push(
        new Tile(index++, color.toString(), {x: i, y: 5})
    )})

    tiles.push(new Tile(
        index++,
        bottomPeak.mix(bottomBase[0], 0.5, {space: 'oklab', outputSpace:'srgb'}).toString(),
        {x: 1, y: 6}
    ))

    tiles.push(new Tile(
        index++,
        bottomPeak.mix(bottomBase[2], 0.5, {space: 'oklab', outputSpace:'srgb'}).toString(),
        {x: 2, y: 6}
    ))  
    
    tiles.push(new Tile(
        index++,
        bottomPeak.mix(bottomBase[4], 0.5, {space: 'oklab', outputSpace:'srgb'}).toString(),
        {x: 3, y: 6}
    ))
    
    tiles.push(new Tile(index++, bottomPeak.toString(), {x:2, y:7}))    
        
    return tiles.flat()

}