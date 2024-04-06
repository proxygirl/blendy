import { useState, useRef, useEffect, useLayoutEffect } from 'react'

import Board from './Board'
import Slot from './Slot'

export default function Puzzle(props) {

    const ref = useRef()
    const [padding, setPadding] = useState(0)


    useEffect(() => {

        setPadding(0)

        setTimeout(() => {
            let difference = ref.current.scrollHeight - ref.current.offsetHeight
            let multiplier = props.level.height > props.level.width ? 4 : 2
            setPadding(difference / multiplier)

        }, 250)

    }, [props.level.id]) 

    const renderSlot = (slot, i) => {
        return (
            <Slot
                key = {`${slot.parent}${i}`}
                tile = {slot.tile}
                coords = { 
                    slot.coords && props.level.trayWidth != props.level.width  ? 
                        {x: slot.coords.x + ((props.level.trayWidth - props.level.width) / 2), y: slot.coords.y} : 
                        slot.coords}
                parent = {slot.parent}
                selected = {props.selected === slot ? true : false}
                locked = {slot.locked}
                onClick = {() => props.onClick(slot)}
            />
        )
    }

    return(
        <main ref={ref}
            className={`puzzle ${props.level.type}`}
            style={{
                paddingInline: `${padding + 5}px`,
            }}
        >
           <Board
                name = 'tray'
                width = {props.level.width }
                trayWidth = {props.level.trayWidth}
                debugging = {props.level.debugging}
            >
                {props.level.puzzle['tray'].map((slot, i) => renderSlot(slot, i))}
            </Board>
            <Board
                name = 'board'
                width = {props.level.width}
                trayWidth = {props.level.trayWidth}
            >
                {props.level.puzzle['board'].map((slot, i) => renderSlot(slot, i))}
            </Board>           
        </main>
    )
}