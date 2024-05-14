import { useState, useRef, useEffect } from 'react'

import Board from './Board'
import Slot from './Slot'

const Puzzle = (props) => {

    const ref = useRef()
    const [padding, setPadding] = useState(0)

    useEffect(() => {

        setPadding(0)

        setTimeout(() => {
            let difference = ref.current.scrollHeight - ref.current.offsetHeight
            let multiplier = (props.board.height + props.tray.height) > (props.board.width + props.tray.width) ? 4 : 2
            setPadding(difference / multiplier)
        }, 250)

    }, [props.id]) 

    const renderSlot = (slot, i) => {
        return (
            <Slot
                key = {`${slot.parent}${i}`}
                tile = {slot.tile}
                coords = { 
                    slot.coords && props.tray.width !== props.board.width  ? 
                        {x: slot.coords.x + ((props.tray.width - props.board.width ) / 2), y: slot.coords.y} : 
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
            className={`puzzle`}
            style={{
                paddingInline: `${padding + 5}px`,
            }}
        >
           <Board
                name = 'tray'
                width = {props.tray.width }
                debug = {props.debug}
            >
                {props.tray.tiles.map((slot, i) => renderSlot(slot, i))}
            </Board>
            <Board
                name = 'board'
                width = {props.tray.width }
            >
                {props.board.tiles.map((slot, i) => renderSlot(slot, i))}
            </Board>           
        </main>
    )
}

export default Puzzle