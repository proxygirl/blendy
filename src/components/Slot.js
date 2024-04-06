export default function Slot(props) {   

    let coords = (props.coords) ? `${props.coords.y+1} / ${props.coords.x+1}` : '' 
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
                }}                     
            >
            </div>
        </div>
    )

}