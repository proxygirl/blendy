import makeBlend from '../makeBlend.js'
import makeTile from '../makeTile.js'

const makeLine = ({length, colorDifference}) => {
    
    let line = makeBlend(null, null, {length: length, difference: colorDifference})
    const vertical =  chance.bool()
    let tiles = []

    line.forEach((color, i) => {
        
        let tile = makeTile({
          id: i,
          coords: {x: vertical ? 0 : i, y: vertical ? i : 0},
          color: color
        })

        tiles.push(tile)

    }) 

    return tiles.flat()

}

export default makeLine