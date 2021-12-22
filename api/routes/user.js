const router = require("express").Router();
const CryptoJs = require("crypto-js");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/verifyToken");
const User = require("../models/User");


//update users
router.put("/:id", verifyTokenAndAuthorization, async(req, res)=>{
   if(req.body.password){
    req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
   }

   try {
       const updatedUser = await User.findByIdAndUpdate(req.params.id, {
           $set: req.body
       },{new: true})

       res.status(200).json({
        success: true,
        message: "",
         data: updatedUser
        });
       
   } catch (err) {
    res.status(500).json({
        success: false,
        message: "Fail to update to user",err,
        data: null
    });
   }
})

//delete
router.delete("/:id",verifyTokenAndAuthorization, async(req, res)=>{
    try{
       await User.findByIdAndDelete(req.params.id)
       res.status(200).json({message: "the users have been deleted"})
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Fail to update to user",err,
            data: null
        });
    }
})


//Get User
router.get("/find/:id",verifyTokenAndAdmin, async(req, res)=>{
    try{
    const user = await User.findById(req.params.id);
    const {password, ...others} = user._doc;
    res.status(201).json({
        success: true,
        message: "",
       data: others
    });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Fail to update to user",err,
            data: null
        });
    }
})


//GET ALL USERS

router.get("/",verifyTokenAndAdmin, async(req, res)=>{
    const query = req.query.new;
    try{
    const users = query ? await User.find().sort({id: -1}).limit(5) : await User.find();
    res.status(201).json({
        success: true,
        message: "",
        data:users
    });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Fail to update to user",err,
            data: null
        });
    }
})

//Get Stat
router.get("/stats",verifyTokenAndAdmin, async(req, res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));

    try {
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {
                $project: {
                    month: {$month: "createdAt"},
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1}
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: "",
            data: data})
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Fail to update to user",err,
            data: null
        });
    }
})

module.exports = router;