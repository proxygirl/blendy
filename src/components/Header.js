export default function Header(props) {

    return(
        <header className='controls'>

            <div onClick={props.reset}>
                {!props.isComplete ? <i className="bi bi-arrow-counterclockwise" ></i> : '' }
            </div>

            <div className="complete">
                {props.isComplete ? 
                    <i className="bi bi-star-fill"></i> : 
                    <i className="bi bi-star"></i>}
            </div>

            <div onClick={props.next}>
                {props.isComplete ? 
                    <i className="bi bi-caret-right-fill"></i> :
                    <i className="bi bi-skip-forward-fill"></i>
                }
            </div>

        </header>
    )
}