import Color from 'colorjs.io'

import Tile from '../Tile.js'
import Blend from '../Blend.js'

export default function Pyramid() {

    let tiles = []
    let index = 0

    let base = Blend(null, null, 5)
    let peak = new Color('srgb',[Math.random(), Math.random(), Math.random()])

    tiles.push(new Tile(index++, peak.toString(), {x:2, y:0}))

    tiles.push(new Tile(
        index++,
        base[0].mix(peak, 0.5, {space: 'oklab', outputSpace:'srgb'}).toString(),
        {x: 1, y: 1}
    ))

    tiles.push(new Tile(
        index++,
        base[1].mix(peak, 0.5, {space: 'oklab', outputSpace:'srgb'}).toString(),
        {x: 2, y: 1}
    ))  
    
    tiles.push(new Tile(
        index++,
        base[2].mix(peak, 0.5, {space: 'oklab', outputSpace:'srgb'}).toString(),
        {x: 3, y: 1}
    ))   
    
    base.forEach((color, i) => {tiles.push(
        new Tile(index++, color.toString(), {x: i, y: 2})
    )})    

    return tiles.flat()

}