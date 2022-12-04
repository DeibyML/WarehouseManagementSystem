import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    id:{
        type: Number, 
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: "En Proceso"
    },
    price:{
        type: mongoose.Decimal128,
        required: true
    },
    clientName:{
        type: String,
        required: true
    }
})

export default mongoose.model('Order', orderSchema) 