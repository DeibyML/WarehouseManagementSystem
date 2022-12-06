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
    total:{
        type: Number,
        required: true
    },
    clientName:{
        type: String,
        required: true
    },
    products:[{
        id:{
            type:Number,
        },
        name:{
            type:String
        },
        quantity:{
            type: Number        
        },
        price:{
            type: Number
        }
    }]

})

export default mongoose.model('Order', orderSchema) 