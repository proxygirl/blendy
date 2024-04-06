import Tile from '../Tile.js'
import Blend from '../Blend.js'

export default function Rectangle(width, height) {

    let tiles = []
    let index = 0
    
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

    return tiles.flat()

}