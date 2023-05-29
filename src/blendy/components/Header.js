const Header = (props) => {

    return(
        <header className='controls'>
            <div className="score">
                <i className="bi bi-trophy-fill"></i>
                <span>{props.score}</span>
            </div>  
            <div className="complete">
                {props.isComplete ? 
                    <i className="bi bi-star-fill"></i> : 
                    <i className="bi bi-star"></i>}
            </div>
            <div>
                {!props.isComplete ? 
                <div onClick={props.reset}>
                    <i className="bi bi-arrow-counterclockwise" ></i>
                </div> : ''}      
                <div onClick={props.onClick}>
                    {props.isComplete ? 
                        <i className="bi bi-caret-right-fill"></i> :
                        <i className="bi bi-skip-forward-fill"></i>
                    }
                </div>
            </div>                  
        </header>
    )
}

export default Header