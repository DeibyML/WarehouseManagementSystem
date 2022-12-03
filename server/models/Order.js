const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
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
    precio:{
        type: mongoose.Decimal128,
        required: true
    },
    idCliente:{
        type: Number,
        required: true
    }
})