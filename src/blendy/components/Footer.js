const Footer = (props) => {
    
    return(
        <footer className='controls'>
            <i 
                className={`bi ${props.theme === 'light' ? 'bi-moon-fill' : 'bi-sun-fill' }`} 
                onClick = {() => props.onClick('theme')}
            ></i>                
            <span>blendy</span>
            <i 
                className={`bi ${props.accessible ? 'bi-toggle-on' : 'bi-toggle-off' }`}
                onClick = {() => props.onClick('accessible')}></i>
        </footer>
    )
}

export default Footer