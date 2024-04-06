import Tile from '../Tile.js'
import Blend from '../Blend.js'

export default function Line(width) {
    
    let blend = Blend(null, null, width)

    let tiles = []

    blend.forEach((color, i) => {
        
        let tile = Tile(i, color.toString(), {x:i, y: 0})

        tiles.push(tile)

    }) 

    return tiles.flat()

}