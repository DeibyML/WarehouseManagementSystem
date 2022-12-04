import Order from '../models/Order.js'

export const getOrders = async (req, res) =>{
    const orders = await Order.find()
    res.send(orders)
}

export const createOrder = async (req, res) =>{
    try{
        const {id,date, status, price, clientName,products} = req.body;
        const newOrder = new Order({id,date, status, price, clientName, products});
        await newOrder.save().then((orderCreated)=>{
            return res.status(201).json({
                'success': true,
                'message': 'Order created successfully!',
                'order': orderCreated
            });
        }

        );
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
        await Order.findOneAndUpdate({id: req.body.id},{
            id:req.body.id,
            date:req.body.date,
            status:req.body.status,
            price:req.body.price,
            clientName:req.body.idClient,
            products:[products]
          }).exec().then((orderUpdated) =>{
            return res.status(200).json({
                'success': true,
                'message': 'Order with id '+req.body.id+' updated successfully!',
                'product': productUpdated
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
        await Order.findByIdAndDelete(req.body._id);
        res.json("Order deleted successfully!");

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