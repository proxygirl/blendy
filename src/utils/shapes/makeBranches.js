import Color from 'colorjs.io'
import chance from '../../lib/chance.js'

import makeTile from '../makeTile.js'
import makeBlend from '../makeBlend.js'

const makeBranches = ({min, max, count = 2, colorDifference}) => {

    let tiles = []
    let index = 0
    let horizontal = Math.random() < 0.5
    
    let branches = []

    for(let i = 0; i < count; i++) {

      let branch = []
      let sprout
      const length = chance.integer({min: min, max: max})

      if(i > 0) {sprout = branches[i-1][chance.integer({
        min: i == 1 ? 0 : 2,
        max: branches[i-1].length - 1
      })]}

      const blend = makeBlend(
        i > 0 ? new Color(sprout.color) : null,
        null,
        {length: length, difference: colorDifference}
      )
      
      if(i > 0) { blend.shift() }

      blend.forEach((color, j) => {branch.push(makeTile({
        id: index++,
        coords: i > 0 ? 
          i % 2 == 0 ? 
            horizontal ? {x: sprout.coords.x + j + 1, y: sprout.coords.y} : {x: sprout.coords.x , y: sprout.coords.y + j + 1} : 
            horizontal ? {x: sprout.coords.x , y: sprout.coords.y + j + 1} : {x: sprout.coords.x + j + 1, y: sprout.coords.y} :
          horizontal ? {x: j, y: 0} : {x: 0, y: j},
        color: color
      }))})

      branches = [...branches, branch]

      tiles.push(branch)

    }

    return tiles.flat()

}

export default makeBranches