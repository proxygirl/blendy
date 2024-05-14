import makeColor from './makeColor'

const getDifferentColor = (existing, threshold) => {

  let different, difference
  let i = 0
  
  // console.log(`Searching for color within ${threshold}`)
  // console.log('................................................')
  // console.time('time')
  
  do {

    i++
    different = makeColor()

    difference = different.distance(existing, "oklab")
    // console.log(`${i}: ${difference}`)  
    
  } while(difference < threshold)
 
  // console.timeEnd('time')
  // console.log(`Found in ${i} tries.`)
  
  return different

}

export default getDifferentColor