const makeTile = ({id, coords, color}) => {
  return {
    id: id,
    coords: coords,
    color: color.toString()
  }
}

export default makeTile