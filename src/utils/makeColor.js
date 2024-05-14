import Color from 'colorjs.io'
import chance from '../lib/chance'

const makeColor = () => {

  const h = chance.integer({min: 0, max: 360})
  const s = chance.integer({min: 30, max: 90})
  const l = chance.integer({min: 10, max: 95})
  
  // console.log(`l: ${l}`)
  
  return new Color('hsl', [h, s, l])

}

export default makeColor