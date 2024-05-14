const Container = (props) => {

  const classes = props.classes instanceof Array ? ["container", ...props.classes].join(" ") : "container"
  return <>
    <div className={ classes }>
      {props.children}
    </div>
  </>

}

export default Container