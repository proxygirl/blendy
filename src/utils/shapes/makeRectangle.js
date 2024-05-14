import makeTile from "../makeTile"
import makeBlend from "../makeBlend"

const makeRectangle = ({width, height, colorDifference}) => {

  let tiles = []
  let index = 0

  const top  = makeBlend(null, null, {length: width, difference: colorDifference})
  const bottom  = makeBlend(null, null, {length: width, difference: colorDifference})
  const right = makeBlend(top[width - 1], bottom[0], {length: height, difference: colorDifference, exclude: true})
  const left = makeBlend(top[0], bottom[width - 1], {length: height, difference: colorDifference, exclude: true})

  top.forEach((color, i) => {tiles.push(
      makeTile({id: index++, color: color,
        coords: {x: i, y: 0}
      })
  )})

  right.forEach((color, i) => {tiles.push(
    makeTile({id: index++, color: color,
      coords: {x: width-1, y: i + 1}
    })
  )})
  
  bottom.forEach((color, i) => {tiles.push(
    makeTile({id: index++, color: color,
      coords: {x: (width - 1) - i, y: height-1}
    })
  )})

  left.forEach((color, i) => {tiles.push(
    makeTile({id: index++, color: color,
      coords: {x: 0, y: i + 1}
    })
  )})   

  return tiles.flat()

}

export default makeRectangle