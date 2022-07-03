const allowRole = (permissions) =>{
  return (req, res, next) => {
    if(req.user){
      const userRole = req.user.role
      if(permissions.includes(userRole)){
        next()
      }else{
        return res.status(401).send("You are not authorized for this route")
      }
    }else{
      return res.status(401).send("Please Login")

    }
  }

}

module.exports = allowRole