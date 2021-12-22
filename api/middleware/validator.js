const  {body} = require("express-validator");




module.exports ={
    validateRegister:[
       body('username')
         .trim()
         .notEmpty()
         .isLength({
            min: 5,
            max: 100, 
         })
         .withMessage('Username must be valid'),
         
        body('email')
           .trim()
           .isEmail()
           .isLength({
            min: 5,
            max: 50,
           })
           .withMessage('Email must be valid')
           .normalizeEmail()
           .toLowerCase(),
          
        body('password')
             .trim()
             .isLength({
                 min: 5,
                 max: 30,
                 toLowerCase: true,
                 toUpperCase: true,
                 isAlphanumeric: true
                 
             })
             .withMessage('Password must be valid'),
             body('confirmPassword').custom((value, {req})=>{
                 if(value !== req.body.password){
                     throw new Error("Password don't match")
                 }
                 return true;
             })
    ]

}