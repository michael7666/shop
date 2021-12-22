const mongoose = require("mongoose");


const TransferSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
      type: String,
      required: true
    },
    amount: {
        type: Number,
        required: true
    },
    reference: {
        type: String,
    }
},{timestamps: true});

module.exports = mongoose.model("transfer", TransferSchema)