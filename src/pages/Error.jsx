import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import Page from "../layouts/Page";
import Navigation from "../layouts/Navigation";

const Error = () => {

  const error = useRouteError()
  
  if ( isRouteErrorResponse(error) ) {
    return(
      <Page title = { error.status }>
        <p>{ error.statusText }</p>
        <Navigation />
      </Page>    
    )
  } else {
    return(
      <Page title = "Error">
        { error.toString() }
        <Navigation />
      </Page>   
    )    
  }
}

export default Error