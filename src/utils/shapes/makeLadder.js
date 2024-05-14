import chance from '../../lib/chance.js'

import makeBlend from '../makeBlend.js'
import makeTile from '../makeTile.js'

const makeLadder = ({height, width, colorDifference}) => {
    
    let tiles = []
    let index = 0

    let rungs = []
    const maxRungs = ((height % 2 ? height + (height & 1) : height) / 2) - 1
    
    let i = 0

    while(i < maxRungs) {
      const rand = chance.integer({min: 1, max: height - 2})
      if(!rungs.includes(rand) && !rungs.includes(rand + 1) && !rungs.includes(rand - 1)) {
        rungs = [...rungs, rand]
      }
      i++
    }

    const left = makeBlend(null, null, {length: height, difference: colorDifference})
    const right = makeBlend(null, null, {length: height, difference: colorDifference})

    left.forEach((color, i) => {tiles.push(
      makeTile({
        id: index++,
        coords: {x: 0, y: i},
        color: color
      })
    )})
    
    right.forEach((color, i) => {tiles.push(
      makeTile({
        id: index++,
        coords: {x: width + 1, y: i},
        color: color
      })
    )})


    for(let i = 0; i < rungs.length; i++) {

      const rung  = makeBlend(left[rungs[i]], right[rungs[i]], {length: width + 2, difference: colorDifference, exclude: true})

      rung.forEach((color, j) => {tiles.push(
        makeTile({
          id: index++,
          coords: {x: j + 1, y: rungs[i]},
          color: color 
        })
      )})  
      
    }

    return tiles.flat()

}

export default makeLadder