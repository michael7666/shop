const mongoose = require("mongoose");


const SingleTransferSchema = new mongoose.Schema({
    
    amount:{
     type: Number
    },
    source:{
        type: String
    },
    recipient: {
        type: String
    },
    reason:{
        type: String
    },
    currency: {
        type: String
    },
    reference: {
        type: String,
    },
    transfer_code: {
        type: String,
    },
    otp: {
        type: String
    }

},{timestamps: true});

module.exports = mongoose.model("singel", SingleTransferSchema)