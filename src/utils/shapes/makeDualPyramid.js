import Color from 'colorjs.io'

import makeTile from '../makeTile'
import makeBlend from '../makeBlend'
import makePyramid from './makePyramid'

const makeDualPyramid = ({colorDifference}) => {

    let tiles = []
    let index = 0

    let topPyramid = makePyramid({layers: 3, difference: colorDifference})
    let bottomPyramid = makePyramid({layers: 3, difference: colorDifference})

    let left = makeBlend(
      new Color(topPyramid[0].color),
      new Color(bottomPyramid[0].color),
      {length: 4, difference: colorDifference, exclude: true}
    )

    let right = makeBlend(
      new Color(topPyramid[4].color),
      new Color(bottomPyramid[4].color),
      {length: 4, difference: colorDifference, exclude: true}
    )    

    topPyramid.forEach(tile => {
      tile.id = index++
    })

    bottomPyramid.forEach(tile => {
      tile.id = index++
      tile.coords = {x: tile.coords.x, y: (tile.coords.y * -1) + 7}
    })
    
    tiles = [...topPyramid, bottomPyramid]

    left.forEach((color, i) => {tiles.push(
      makeTile({id: index++, color: color,
        coords: {x: 0, y: i + 3}
      })
    )})    

    right.forEach((color, i) => {tiles.push(
      makeTile({id: index++, color: color,
        coords: {x: 4, y: i + 3}
      })
    )}) 

    console.log(tiles)
    return tiles.flat()

}

export default makeDualPyramid