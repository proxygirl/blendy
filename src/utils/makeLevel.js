import chance from '../lib/chance.js'

import SHAPES from '../data/shapes.json'
import DIFFICULTIES from '../data/difficulties.json'

const DEBUGGING = false

const getDifficulty = (difficulty) => {
  if (DIFFICULTIES) {
    if(DIFFICULTIES[difficulty]) { return DIFFICULTIES[difficulty] }
    else { return DIFFICULTIES["easy"] }
  }
  else { return null }
}

const getShape = (shape) => {
  if(SHAPES) {
    if(shape) { return SHAPES.find(obj => obj.name == shape) }
    else { return SHAPES.find(obj => obj.name == "line")}
  }
  else { return null }
}

const selectShape = (difficulty) => {

  const shape = chance.weighted(difficulty.shapes, difficulty.weights)

  return getShape(shape)

}

const buildArguments =(definitions, modifiers) => {

  let args = {}
  
  definitions.forEach(arg => {

    let value

    switch(arg.type) {
      case "range": 
        value = modifiers && modifiers[arg.name] ?
          chance.integer({
            min: arg.range.min + (modifiers[arg.name].min ? Number(modifiers[arg.name].min) : 0),
            max: arg.range.max + (modifiers[arg.name].max ? Number(modifiers[arg.name].max) : 0)})
          :
          chance.integer({
            min: arg.range.min,
            max: arg.range.max })
        break
      default: 
        value = modifiers ? 
          arg.value + (modifiers[arg.name] ? Number(modifiers[arg.name]) : 0) :
          arg.value
        break
    }
    
    args[arg.name] = value

  })

  return args

}

const makeLevel = async (options) => {

  // get difficulty object from provided options
  const difficulty = getDifficulty(options.difficulty)

  // select shape to render based on difficulty
  const shape = selectShape(difficulty)

  // get difficultiy modifiers for shape
  const modifiers = difficulty.shapeModifiers[shape.name]

  // await the shape's generate function
  const { default: makeShape } = await import(`./shapes/${shape.function.path}.js`)

  // build required arguments for generate function
  const args = buildArguments(shape.function.args, modifiers)

  args.colorDifference = difficulty.colorDifference

  // generate tiles from shape function
  const tiles = makeShape(args)

  // set solution to an array of the tile ids in order
  const solution = tiles.map(tile => tile.id);

  // initialize puzzle object
  let puzzle = {"tray": {}, "board": {}}

  // initialize tray object
  let tray = {
    "tiles": [],
    "width": "",
    "height": ""
  }

  // initialize board object
  let board = {
    "tiles": [],
    "width": Math.max(...tiles.map(tile => tile.coords.x)) + 1,
    "height": Math.max(...tiles.map(tile => tile.coords.y)) + 1
  }

  // retrieve locked tile frequency from shape options
  // console.log(modifiers.lockedFrequency)
  const lockedFrequency = modifiers ? (modifiers.lockedFrequency ? modifiers.lockedFrequency : shape.options.lockedFrequency) : shape.options.lockedFrequency

  // create an array of tile ids that will be locked based on provided frequency
  let lockedTiles = []

  // if locked tile frequency is not provided skip adding to the array
  if(lockedFrequency && lockedFrequency != 0) {
    
    for(let i = 0; i < Math.floor(tiles.length/lockedFrequency); i++) {        
      const min = i * lockedFrequency
      const max = (i * lockedFrequency) + lockedFrequency

      lockedTiles.push(chance.integer({min: min, max: max-1}));
    }

  }

  // add all tiles that are not locked to the tray
  tray.tiles = [...tiles].filter((tile, index) => !lockedTiles.includes(index))

  // shuffle the order of tiles in the tray
  tray.tiles = chance.shuffle(tray.tiles)

  // determine the combined height of the tray and board
  tray.height = Math.ceil(tray.tiles.length/board.width)

  let ratio = board.width / (tray.height + board.height)
  console.log(ratio)
  // make the tray wider if the tray contains too many rows when rendered at the board width
  tray.width = ratio <= 0.625  ? 
    ratio <= 0.33 ? board.width + 4 : board.width + 2 :
    board.width

  // update tray height to reflect the new tray width
  tray.height = Math.ceil(tray.tiles.length/tray.width)

  // determine how many empty tiles the tray needs to fill the remainder
  let emptyTiles = (tray.height * tray.width) - tray.tiles.length

  // add empty tiles to the tray
  for(let r = 0; r < emptyTiles; r++) tray.tiles.push(null)

  // map tray tiles to slot objects
  tray.tiles = tray.tiles.map(tile => ({
    parent: 'tray',
    coords: null,
    tile: tile ? tile : null
  }))

  // map board tiles to slot objects
  board.tiles = tiles.map((tile, index) => ({
    parent: 'board',
    coords: tile.coords,
    tile: (lockedTiles.includes(index) || DEBUGGING) ? tiles[index] : null,
    locked: (lockedTiles.includes(index)) ? true : false    
  }));

  puzzle.tray = tray
  puzzle.board = board
  
  let level = {
    id: chance.string({ length: 5 }),
    validated: true,
    debug: DEBUGGING,
    type: shape.name,
    difficulty: difficulty.label,
    solved: false,
    solution: solution,    
    puzzle: puzzle,
    reset: JSON.parse(JSON.stringify(puzzle))
  }

  return level

}

export default makeLevel