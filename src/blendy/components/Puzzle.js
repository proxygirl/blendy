import React, { useRef, useEffect, useState } from 'react'

import Board from './Board'
import Slot from './Slot'

const Puzzle = (props) => {
    
    const renderSlot = (slot, i) => {
        return (
            <Slot
                key = {`${slot.parent}${i}`}
                tile = {slot.tile}
                coords = {slot.coords}
                parent = {slot.parent}
                selected = {props.selected === slot ? true : false}
                locked = {slot.locked}
                onClick = {() => props.onClick(slot)}
            />
        )
    }
    let puzzleRatio = props.level.height / props.level.width
    console.log(`window: ${props.ratio}`)
    console.log(`puzzle ${puzzleRatio}`)
    let shrink = (Math.round(((props.level.height / props.level.width) - props.ratio) * 10) / 10)
    console.log(shrink)
    
    return(
        <div 
            className={`puzzle ${props.level.type}`}
            style={{

            }}
        >
           <Board
                name = 'tray'
                width = {props.level.width}
                debugging = {props.level.debugging}
            >
                {props.level.puzzle['tray'].map((slot, i) => renderSlot(slot, i))}
            </Board>
            <Board
                name = 'board'
                width = {props.level.width}
            >
                {props.level.puzzle['board'].map((slot, i) => renderSlot(slot, i))}
            </Board>           
        </div>
    )
}

export default Puzzle