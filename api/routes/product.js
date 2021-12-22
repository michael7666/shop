const router = require("express").Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middleware/verifyToken");
const Product = require("../models/Product");


//Create
router.post("/",verifyTokenAndAdmin, async(req, res)=>{
const newProduct = new Product(req.body);

try {
    const savedProduct = await newProduct.save();
    res.status(200).json({
        success: true,
        message: "",
       data:  savedProduct
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
       const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
           $set: req.body
       },{new: true})

       res.status(200).json({
        success: true,
        message: "",
        data: updatedProduct
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
       await Product.findByIdAndDelete(req.params.id)
       res.status(200).json({message: "the product have been deleted"})
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Fail to add to cart",err,
            data: null
        });
    }
})


// //Get product
router.get("/find/:id", async(req, res)=>{
    try{
    const product = await Product.findById(req.params.id);
    res.status(201).json({
        success: true,
        message: "",
       data:  product
    });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Fail to add to cart",err,
            data: null
        });
    }
})

// //GET ALL product

router.get("/", async(req, res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
       let products;
       if(qNew){
          products = await Product.find().sort({createdAt: -1}).limit(5);
       }else if(qCategory){
           products = await Product.find({
            categories: {
                $in: [qCategory],
            }
           })
       }else {
           products = await Product.find();
       }
        
    res.status(201).json({
        success: true,
        message: "",
       data:  products
    });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Fail to add to cart",err,
            data: null
        });
    }
})




module.exports = router;