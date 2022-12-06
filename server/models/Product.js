import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id:{
        type:Number,
        required: true
    },
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
        type: Number,
        required: true
    }
})

export default mongoose.model('Product', productSchema) 
