const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const passport =require("passport");


/**
 * 
 * @DESC To register the user (Admin, User, Moderator)
 */

const userResgister = async(userDel, role, res) =>{
    try {
        //validateusername
        let usernameNotToken = await validateUsername(userDel.username);
        if(!usernameNotToken){
            res.status(401).json({
                message: "Username already taken",
                success: false,
                data: null
            })
        }
        //validateEmail
        let emailNotTaken = await validateEmail(userDel.email);
        if(!emailNotTaken){
            res.status(401).json({
                message: "email is already taken",
                success: false,
                data: null
            })
        }
        const password = CryptoJs.AES.encrypt(userDel.password, process.env.SECRET_KEY).toString()
        //create new user
        const newUser = new User({
            ...userDel,
            password,
            role
        })
    //    console.log(newUser);
     const savedUser =   await newUser.save();
        res.status(200).json({
            message: "registration is successfull",
            success: true,
            data: savedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "unable to create your account",
            success: false,
            data: null
        })
    }

}

const userAuth = passport.authenticate("jwt", {session: false});

/**
 * 
 * @Desc To login the user (Admin, User, Moderator)
 */

const userLogin = async(userCre, role, res) => {
    try {
      let {username, password} = userCre;
      const user = await User.findOne({username});
      if(!user){
          res.status(403).json({
              message: "Username is not found. invalid login credentials",
              success: false
          })
      }
      if(user.role !==  role){
          return res.status(403).json({
           message: "Please make sure you are loggin to the portal",
           success: false
          })
      }  
      const hashedpassword =  CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY, password);
      const orginalpassword = hashedpassword.toString(CryptoJs.enc.Utf8);
      if(!orginalpassword) return new Error("password don't exist")
      const accessToken = jwt.sign({
          user_id: user._id,
          email: user.email,
          username: user.username,
          role: user.role
      }, process.env.SECRETS_KEYS, {expiresIn: "1d"});

      const {passwords, ...others} = user._doc;
      res.status(200).json({
        ...others,
          accessToken
         });
    } catch (error) {
        res.status(500).json({
            message: "unable to login into the page",
            success: false,
            data: null,
            error
        })
    }
}

const validateUsername = async(username) =>{
    let user = await User.findOne({username});
    return user ? false : true;
}

const validateEmail = async(email)=>{
 let user = await User.findOne({email});
 return user ? false : true;
}

const checkRole = (roles) => (req, res, next) =>{
    !roles.includes(req.user.role)
      ? res.status(401).json({
          message: "unauthorized"
      })
      : next();
}

const serilizaUser = (user) =>{
    return {
        username: user.username,
        email: user.email,
        _id : user._id,
        updatedAt: user.updatedAt,
        createAt: user.createAt
    }


}


module.exports = {
 userResgister,
 serilizaUser,
 userLogin,
 validateEmail,
 validateUsername,
 checkRole,
 userAuth
}