const router = require("express").Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("../middleware/verifyToken");
const Cart = require("../models/Cart");


//Create
router.post("/",verifyToken, async(req, res)=>{
const newCart = new Cart(req.body);

try {
    const savedCart = await newCart.save();
    res.status(200).json({
        success: true,
        message: "Cart have been added",
        data: savedCart
    });
} catch (err) {
    res.status(500).json({
        success: false,
        message: "Fail to add to cart",err,
        data: null
    });
}
})



 //update
router.put("/:id", verifyTokenAndAuthorization, async(req, res)=>{
   try {
       const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
           $set: req.body
       },{new: true})

       res.status(200).json({
           success: true,
           message: "",
           data: updatedCart
       });
       
   } catch (err) {
      res.status(500).json({
        success: false,
        message: "Fail to add to cart",err,
        data: null
      }); 
   }
})

//delete
router.delete("/:id",verifyTokenAndAuthorization, async(req, res)=>{
    try{
       await Cart.findByIdAndDelete(req.params.id)
       res.status(200).json({ message: "the cart have been deleted"})
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Fail to add to cart",err,
            data: null
        })
    }
})


// //Get user cart
router.get("/find/:userid", async(req, res)=>{
    try{
    const cart = await Cart.findOne({userId: req.params.userId});
    res.status(201).json({
        success: true,
        message: "",
        data: cart
    });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Fail to add to cart",err,
            data: null
        })
    }
})

// // //GET ALL

router.get("/find/:id",verifyTokenAndAdmin, async(req, res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json({
        success: true,
        message: "",
        data: carts
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Fail to add to cart",err,
            data: null
        })
    }
    
})





module.exports = router;