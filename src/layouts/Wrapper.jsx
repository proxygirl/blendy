const Wrapper = (props) => {

  const classes = props.classes instanceof Array ? ["wrapper", ...props.classes].join(" ") : "wrapper"
  return <>
    <div className={ classes  }>
      {props.children}
    </div>
  </>

}

export default Wrapper