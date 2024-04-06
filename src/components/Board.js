import { useResizeDetector } from 'react-resize-detector'

export default function Board(props) { 

    const { width, height, ref } = useResizeDetector({
        handleHeight: (!props.isComplete && props.name === 'tray'),
        handleWidth: false
    })   

    return (
        <div
            ref = {(props.name === 'tray') ? ref : null}
            className = {props.name}
            style = {{
                gridTemplateColumns: `repeat(${props.trayWidth}, 1fr)`,
                display: `${(props.debugging && props.name === 'tray') ? 'none' : ''}`,
                "--height": props.name === 'tray' ? `${height}px` : ''
                
            }}            
            >
            {props.children}
        </div>
    )
}