import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
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

export default mongoose.model('Client', clientSchema) 