import React from 'react'

class Slot extends React.Component {   
    render() {    
        let coords = (this.props.coords) ? 
            `${this.props.coords.y+1} / ${this.props.coords.x+1}` : '' 
        return(
            <div
                className="slot"
                tabIndex = "0" 
                onClick={() => this.props.onClick()}
                style={{
                    gridArea: coords
                }}     
            >
                <div
                    className={`tile ${(!this.props.tile) ? 'empty' : ''} ${(this.props.selected) ? 'selected' : ''} ${(this.props.locked) ? 'locked' : ''}`} 
                    style={{
                        background: this.props.tile ? this.props.tile.rgb : '',
                    }}                     
                >
                </div>
            </div>
        )
    }
}

export default Slot;