import Order from '../models/Order.js'
import Product from '../models/Product.js'

export const getOrders = async (req, res) =>{
    const orders = await Order.find()
    res.send(orders)
}

export const createOrder = async (req, res) =>{
    try{
        const {id,date, status, total, clientName,products} = req.body;
        const newOrder = new Order({id,date, status, total, clientName, products});
        await newOrder
        .save()
        .then((orderCreated)=>{
            return res.status(201).json({
                'success': true,
                'message': 'Order created successfully!',
                'order': orderCreated
            });
        })
        .then(()=>{
            //Update products
            products.forEach(async element=>{
                let filter = {id:element.id};
                let product = await Product.findOne(filter);
                let newQuantity = product.quantity - element.quantity;
                //Updating document in MongoDb
                await Product.updateOne(filter,newQuantity);
                //Updating document in Mongoose
                product.quantity = newQuantity;
                await product.save();
            })
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
          });
    }
}

export const updateOrder =  async (req, res) =>{
    try{
        await Order.findByIdAndUpdate(req.body._id,{
            _id: req.body._id,
            id:req.body.id,
            date:req.body.date,
            status:req.body.status,
            total:req.body.total,
            clientName:req.body.idClient,
            products:[products]
          }).exec().then((orderUpdated) =>{
            return res.status(200).json({
                'success': true,
                'message': 'Order with id '+req.body.id+' updated successfully!'
            }); 
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
          });
    }
}

export const deleteOrder =  async (req, res) =>{
    try {
        await Order.findByIdAndRemove(req.body._id).exec().then(()=>{
            return res.status(200).json({
                'success': true,
                'message': 'Client deleted successfully!'
            });
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
          });
    }
}

export const getOrder = async (req, res) =>{
    try {
        let order = await Order.findOne({id:req.params.idOrder});
        res.json(order);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
          });
    }
}