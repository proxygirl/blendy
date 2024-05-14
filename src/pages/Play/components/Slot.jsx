import Color from 'colorjs.io'

const Slot = (props) => {   

  let coords = (props.coords) ? `${props.coords.y+1} / ${props.coords.x+1}` : ''
  let lockedColor = "white"

  if(props.locked) {
    const white = new Color("white")
    const tileColor = new Color(props.tile.color)

    lockedColor = tileColor.distance(white, "oklab") < 0.55 ? "black" : "white"
  }

  return(
      <div
          className="slot"
          tabIndex = "0" 
          onClick={() => props.onClick()}
          style={{
              gridArea: coords
          }}     
      >
          <div
              className={`tile ${(!props.tile) ? 'empty' : ''} ${(props.selected) ? 'selected' : ''} ${(props.locked) ? 'locked' : ''}`} 
              style={{
                  background: props.tile ? props.tile.color : '',
                  "--locked-color": lockedColor
              }}                     
          >
          </div>
      </div>
  )

}

export default Slot