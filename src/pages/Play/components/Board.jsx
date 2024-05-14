import { useResizeDetector } from 'react-resize-detector'

const Board = (props) => { 

    const { width, height, ref } = useResizeDetector({
        handleHeight: (!props.isComplete && props.name === 'tray'),
        handleWidth: false
    })   

    return (
        <div
            ref = {(props.name === 'tray') ? ref : null}
            className = {props.name}
            style = {{
                gridTemplateColumns: `repeat(${props.width}, 1fr)`,
                display: `${(props.debug && props.name === 'tray') ? 'none' : ''}`,
                "--height": props.name === 'tray' ? `${height}px` : ''
                
            }}            
            >
            {props.children}
        </div>
    )
}

export default Board