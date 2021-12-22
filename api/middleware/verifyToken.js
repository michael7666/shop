const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next)=>{
  const authHeader = req.headers.token;
  if(authHeader){
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.SECRETS_KEYS, (err, user)=>{
          if(err) res.status(401).json("Wrong token");
          req.user =user;

          next();
      })
      
  }else {
      res.status(401).json("You are not authenticated");
  }
}

const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyToken(req,res ,() =>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else {
            res.status(403).json("not authorizated");
        }
    })
}

const verifyTokenAndAdmin = (req, res, next)=>{
    verifyToken(req,res ,() =>{
        if(req.user.isAdmin){
            next();
        }else {
            res.status(403).json("not authorizated");
        }
    })
}

module.exports = {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin };