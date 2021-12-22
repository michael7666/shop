const router = require("express").Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("../middleware/verifyToken");
const Order = require("../models/Order");


//Create
router.post("/",verifyToken, async(req, res)=>{
const newOrder = new Order(req.body);

try {
    const savedOrder = await newOrder.save();
    res.status(200).json({
        success: true,
        message: "",
        data: savedOrder
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
router.put("/:id", verifyTokenAndAdmin, async(req, res)=>{
   try {
       const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
           $set: req.body
       },{new: true})

       res.status(200).json({
        success: true,
        message: "",
          data:  updatedOrder
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
router.delete("/:id",verifyTokenAndAdmin, async(req, res)=>{
    try{
       await Order.findByIdAndDelete(req.params.id)
       res.status(200).json( { message: "the order have been deleted"})
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Fail to add to cart",err,
            data: null
        })
    }
})


 //Get user order
router.get("/find/:userid", async(req, res)=>{
    try{
    const order = await Order.find({userId: req.params.userId});
    res.status(201).json({
        success: true,
        message: "",
        data: order
    });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Fail to add to cart",err,
            data: null
        })
    }
})

 //GET ALL

router.get("/",verifyTokenAndAdmin, async(req, res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json({
        success: true,
        message: "",
        data: orders
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Fail to add to cart",err,
            data: null
        })
    }
    
})

//Get income
router.get("/income", verifyTokenAndAdmin, async(req, res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

    try {
        const data = await Order.aggregate([
            {$match: {createdAt: {$gte: prevMonth}}},
            {
                $project: {
                    month: {$month: "createdAt"},
                    sales: "$amount",
                }
            },
            {
            $group:{
                id: "$month",
                total: {$sum: "$sales"}
                }
            }
        ]);
        res.status(200).json({
            success: true,
            message: "",
            data: data
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Fail to add to cart",err,
            data: null
        });
    }
})



module.exports = router;