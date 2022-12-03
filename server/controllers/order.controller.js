import Order from '../models/Order.js'

export const getOrders = async (req, res) =>{
    const orders = await Order.find()
    res.send(orders)
}

export const createOrder = async (req, res) =>{
    try{
        const {id,date, status, price, idClient} = req.body;
        const newOrder = new Order({id,date, status, price, idClient});
        await newOrder.save();
        return res.json({
            'status':200,
            'message': 'Order created successfully!'
        });
    }catch(error){
        res.json(error);
        console.error(error);
    }
}

export const updateOrder =  (req, res) =>{
    res.json({
        status: 'Updated order with Id:' + req.params.idOrder
    });
}

export const deleteOrder =  async (req, res) =>{
    try {
        await Order.findByIdAndRemove(req.params.idOrder);
        res.json("Order deleted successfully!");

    } catch (error) {
        res.json(error);
        console.error(error);
    }
}

export const getOrder = async (req, res) =>{
    try {
        let order = await Order.findById(req.params.idOrder);
        res.json(order);

    } catch (error) {
        res.json(error);
        console.error(error);
    }
}