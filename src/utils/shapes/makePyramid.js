import makeColor from '../makeColor.js'
import makeTile from '../makeTile.js'
import makeBlend from '../makeBlend.js'

const makePyramid = ({layers, colorDifference, peak = makeColor(), baseStart = makeColor(), baseEnd = makeColor()}) => {

    let tiles = []
    let index = 0
    
    let base =  makeBlend(baseStart, baseEnd, {length: 2 * layers - 1, difference: colorDifference})

    let left = makeBlend(base[0], peak, {length: layers, difference: colorDifference, exclude: true})
    let right = makeBlend(base[base.length - 1], peak, {length: layers, difference: colorDifference, exclude: true})

    base.forEach((color, i) => {tiles.push(
      makeTile({
        id: index++,
        coords: {x: i, y: layers - 1},
        color: color
      })
    )})

    for(let i = 0; i < layers - 2; i++) {

      const layer = makeBlend(
        left[i],
        right[i],
        {length: (2 * ((layers - 1) - i)) - 1, difference: colorDifference}
      )

      layer.forEach((color, j) => {tiles.push(
        makeTile({
          id: index++,
          coords: {x: (i + 1) + j, y: (layers - 2) - i},
          color: color 
        })
      )})      

    }

    tiles.push(makeTile({
      id: index++,
      coords: {x: layers - 1, y: 0},
      color: peak 
    }))   

    return tiles.flat()

}

export default makePyramid