const validateJSON = (json, validator) => {

  if (json) {

    try {

      let parsed = JSON.parse(json)

      if(validator(parsed)) {

        console.log("Good JSON")
        console.log(parsed)
        return true

      } else {

        console.log("Does not match schema")
        return false
      }

    } catch (error) {
      console.log("Invalid JSON")
      return false       
    }

  } else {
    console.log("Does not exist")
    return false
    
  }

}

export default validateJSON