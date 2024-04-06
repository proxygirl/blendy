import Color from 'colorjs.io'
import Blend from '../Blend.js'
import Tile from '../Tile.js'

export default function Diamond() {
    
    let tiles = []
    let index = 0

    // let top = new Color('srgb',[Math.random(), Math.random(), Math.random()])
    // let left = new Color('srgb',[Math.random(), Math.random(), Math.random()])
    // let right = new Color('srgb',[Math.random(), Math.random(), Math.random()])
    // let bottom = new Color('srgb',[Math.random(), Math.random(), Math.random()])

    // let topLeft = top.mix(left, 0.5, {space: 'oklab', outputSpace:'srgb'})
    // let topRight = top.mix(right, 0.5, {space: 'oklab', outputSpace:'srgb'})
    // let bottomLeft = bottom.mix(left, 0.5, {space: 'oklab', outputSpace:'srgb'})
    // let bottomRight = bottom.mix(right, 0.5, {space: 'oklab', outputSpace:'srgb'})

    // let topMiddle = topLeft.mix(topRight, 0.5, {space: 'oklab', outputSpace:'srgb'})
    // let leftMiddle = topLeft.mix(bottomLeft, 0.5, {space: 'oklab', outputSpace:'srgb'})
    // let rightMiddle = topRight.mix(bottomRight, 0.5, {space: 'oklab', outputSpace:'srgb'})
    // let bottomMiddle = bottomLeft.mix(bottomRight, 0.5, {space: 'oklab', outputSpace:'srgb'})

    // let mix1 = topMiddle.mix(leftMiddle, 0.5, {space: 'oklab', outputSpace:'srgb'})
    // let mix2 = bottomMiddle.mix(rightMiddle, 0.5, {space: 'oklab', outputSpace:'srgb'})

    // let center = mix1.mix(mix2, 0.5, {space: 'oklab', outputSpace:'srgb'})

    // tiles.push(new Tile(index++, top.toString(),            {x: 2, y: 0}))
    // tiles.push(new Tile(index++, topLeft.toString(),        {x: 1, y: 1}))
    // tiles.push(new Tile(index++, topMiddle.toString(),      {x: 2, y: 1}))
    // tiles.push(new Tile(index++, topRight.toString(),       {x: 3, y: 1}))
    // tiles.push(new Tile(index++, left.toString(),           {x: 0, y: 2}))
    // tiles.push(new Tile(index++, leftMiddle.toString(),     {x: 1, y: 2}))
    // tiles.push(new Tile(index++, center.toString(),         {x: 2, y: 2}))
    // tiles.push(new Tile(index++, rightMiddle.toString(),    {x: 3, y: 2}))
    // tiles.push(new Tile(index++, right.toString(),          {x: 4, y: 2}))
    // tiles.push(new Tile(index++, bottomLeft.toString(),     {x: 1, y: 3}))
    // tiles.push(new Tile(index++, bottomMiddle.toString(),   {x: 2, y: 3}))
    // tiles.push(new Tile(index++, bottomRight.toString(),    {x: 3, y: 3}))
    // tiles.push(new Tile(index++, bottom.toString(),         {x: 2, y: 4}))

    let horizontal = new Blend(null, null, 5)

    let verticalTop = new Blend(horizontal[2], null, 3)
    verticalTop.shift()
    let verticalBottom = new Blend(horizontal[2], null, 3)
    verticalBottom.shift()

    horizontal.forEach((color, i) => {tiles.push(
        new Tile(index++, color.toString(), {x: i, y: 2})
    )})

    verticalTop.forEach((color, i) => {tiles.push(
        new Tile(index++, color.toString(), {x: 2, y: 1 - i})
    )})

    verticalBottom.forEach((color, i) => {tiles.push(
        new Tile(index++, color.toString(), {x: 2, y: 3 + i})
    )})

    return tiles.flat()

}