const router = require("express").Router();
const  {validationResult} = require("express-validator");
const { validateRegister } = require("../middleware/validator");
const {userResgister,
    serilizaUser,
    userLogin,
    checkRole,
    userAuth

} = require("../until/Auths");




//user  Registration


router.post("/register", validateRegister, async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
     return res.status(400).json({
         errors: errors.array(),
     })
    }
    
    // console.log(res);
    await userResgister(req.body, "user", res);
    

});

//admin register
router.post("/register-admin", async(req, res) =>{
    await userResgister(req.body, "admin", res);
})



//supper admin register
router.post("/register-supper-admin", async(req, res) =>{
    await userResgister(req.body, "moderator", res);
})


//user login
router.post("/login", validateRegister, async(req, res)=>{
    await userLogin(req.body, "user", res);
       
})

//admin login
router.post("/login-admin",validateRegister, async(req,res)=>{
    await userLogin(req.body, "admin", res);
})

//supper admin login
router.post("/login-supper-admin", validateRegister, async(req,res)=>{
    await userLogin(req.body, "moderator", res);
})

//profile
router.get("/profile", userAuth,  async(req, res)=>{
    return res.status(200).json(serilizaUser(rq.user));
})

//user protected router
router.get("/user-protected",userAuth, checkRole(["user"]), async(req, res)=>{
   return res.json("welcome user");
})
//admin protected router
router.get("/admin-protected", userAuth, checkRole(["admin"]), async(req, res)=>{
    return res.json("welcome admin");
})
//supper protected router
router.get("/supper-protected", userAuth, checkRole(["moderator"]), async(req, res)=>{
    return res.json("welcome Moderator");
})
// supper admin protected router
router.get("/supper-admin and admin", userAuth, checkRole(["moderator", "admin"]), async(req, res)=>{
    return res.json("welcome moderator and admin");
})
module.exports = router;