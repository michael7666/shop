const router = require("express").Router();

const paystack = require("paystack")(process.env.PAYSTACK_KEY);
const Transfer = require("../models/Transfer");


// const paystack = new PayStack(process.env.PAYSTACK_KEY)


router.post("/payment",  (req, res)=>{
    paystack.plan.create({
        name: req.body.name,
        amount: req.body.amount,
        interval: 'monthly',
      },(paystackErr, paystackRes)=>{
          if(paystackErr){
            
                res.status(500).send({message: "payment failed"});
          }else {
              
               res.status(200).send({data: paystackRes});
          }
      })
      
})

// router.post("/payments", async(req, res) =>{
//     try {
//         // const newPayment = await Transfer({
//         //     full_name:  req.body.full_name,
//         //     email: req.body.email,
//         //     amount: req.body.amount,
//         //     reference: req.body.reference
//         // })
//         // console.log(newPayment);
//         await paystack.initiateTransfe({
//             full_name:  req.body.full_name,
//                 email: req.body.email,
//                 amount: req.body.amount,
//                 reference: req.body.reference
//         },(paystackErr, paystackRes)=>{
//             console.log(paystackRes);
//             if(paystackErr){
//                 res.status(500).send({message: "payment failed"});
//                 return;
//             }
            
//             res.status(200).send({
//                 success: true,
//                 message: "",
//                 data: paystackRes
//             })
//         });
//         console.log(req.body)
//     } catch (error) {
//         res.status(500).json({
//             message: "payment failed",
//             data: null
//         })
//     }
// })

// router.post("/transfer", async (req, res)=>{
//     try {
//         const transfers = await paystack.initiateTransfer({
//             source: req.body.balance,
//             amount: req.body.amount,
//             currency: "NGN",
//             recipient: req.body.recipient,
//             reference: req.body.reference,
//             email: req.body.email
//         })
//         res.status(200).send(transfers);
//         console.log(transfers);
//         console.log(req.body);
//     } catch (error) {
//         res.status(500).send(error);
//         console.log(error);
//     }
// } )


module.exports = router;