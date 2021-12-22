const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const  {body, validationResult} = require("express-validator");
const { validateRegister } = require("../middleware/validator");
// const bcryptJs = require("bcryptjs");



//Registration

router.post("/register", validateRegister, async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
     return res.status(400).json({
         errors: errors.array(),
     })
    }else{
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
        })
        try {
    
            const savedUser = await newUser.save();
            res.status(200).json({
                success: true,
                message: "success loggin",
                data: savedUser,
            });
        } catch (err) {
            res.status(500).json({
                data: null,
                success: false,
                message: err
            });
        }
    }
    

});



router.post("/login", validateRegister, async(req, res)=>{
            
          try {
                const user = await User.findOne({username: req.body.username});
                if(!user) return new Error("Username don't exist")
        
                  const hashedpassword =  CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY);
                
                const orginalpassword = hashedpassword.toString(CryptoJs.enc.Utf8);
                 if(!orginalpassword) return new Error("password don't exist")
                const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRETS_KEYS, {expiresIn: "1d"});
        
                const {password, ...others} = user._doc;
                res.status(200).json({
                   ...others,
                     accessToken
                    });
            } catch(err) {
                res.status(500).json({
                    data: null,
                    success: false,
                    message: err
                });
          }
})


module.exports = router;