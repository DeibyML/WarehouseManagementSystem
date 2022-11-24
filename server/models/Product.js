import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    quantity:{
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    location:{
        type: String,
        required: true,
        trim: true
    },
    price:{
        type: mongoose.Decimal128,
        required: true
    }
})

export default mongoose.model('Product', productSchema) 
