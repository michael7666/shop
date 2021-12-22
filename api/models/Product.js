const mongoose = require("mongoose");


const ProductSchame = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    size: {
        type: Array,
      
    },
    categories: {
        type: Array,
       
    },
    color: {
        type: Array,
     
    },
    price: {
        type: Number,
        required: true
    },
    inStock: {
        type: Boolean,
        default: true
    }
   

}, {timestamps: true});


module.exports = mongoose.model("Products", ProductSchame);