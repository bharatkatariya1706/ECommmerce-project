import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    products:[{
        type:mongoose.ObjectId,
        ref:'Product',
    }],
    payment:{

    },
    buyer:{
        type:mongoose.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        default:'Not processed',
        enum:['Not processed' , 'Processing' , 'Shipped' , 'Delivered' , 'Cancelled']

    }

},{timeStamps:true})

export default mongoose.model('Order' , orderSchema)