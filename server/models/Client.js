const mongoose = require('mongoose');
const {Schema} = mongoose;

const clientSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    telephone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String
    },
    postalCode:{
        type: String
    },
    city:{
        type: String
    },
    province:{
        type: String
    }
})