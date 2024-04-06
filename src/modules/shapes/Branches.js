import Tile from '../Tile.js'
import Blend from '../Blend.js'

export default function Branches(length) {

    let tiles = []
    let index = 0
    let direction = Math.random() < 0.5

    let trunk = new Blend(null, null, length)
    let sprout = Math.floor(Math.random() * trunk.length)
    
    let branch = new Blend(trunk[sprout], null, length)

    trunk.forEach((color, i) => {tiles.push(new Tile(
        index++,
        color.toString(),
        direction ? {x: i, y: 0} : {x: 0, y: i}      
    ))})

    branch.shift()
    branch.forEach((color, i) => {tiles.push(new Tile(
        index++,
        color.toString(),
        direction ? {x: sprout, y: i + 1} : {x: i + 1, y: sprout}      
    ))})

    return tiles.flat()

}