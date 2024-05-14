import Color from 'colorjs.io'

import makeColor from '../makeColor.js'
import makeTile from '../makeTile.js'

import makeRectangle from './makeRectangle.js'

const makeRectanglePyramid = ({colorDifference}) => {

    let tiles = makeRectangle({width: 5, height: 7, difference: colorDifference})
    let index = tiles.length - 1

    const peak = makeColor()

    tiles.push(makeTile({
        id: index++, color: peak,
        coords: {x: 2, y: 3}
      })
    )

    for(let i = 0; i < 3; i++) {
      const color = peak.mix(new Color(tiles[5 + (2 * i)].color.toString()), {space: "oklab", outputSpace: "oklab"})
      console.log("test")
      tiles.push(makeTile({
        id: index++, color: color,
        coords: {x: 3, y: 2 + i}
      })
    )      
    }

    return tiles.flat()

}

export default makeRectanglePyramid