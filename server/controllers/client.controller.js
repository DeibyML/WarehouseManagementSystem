import Client from '../models/Client.js'

export const getClients = async (req, res) =>{
    const clients = await Client.find()
    res.send(clients)
}

export const createClient = async (req, res) =>{
    try{
        const {id,name, telephone, email, address, postalCode, city, province } = req.body;
        const newClient = new Client({id, name, telephone, email, address, postalCode, city, province});
        await newClient.save().then((clientCreated)=>{
            return res.status(201).json({
                'success': true,
                'message': 'Client created successfully!',
                'client': clientCreated
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

export const updateClient =  async (req, res) =>{
    try{
        await Client.findByIdAndUpdate(req.body._id,{
            id:req.body.id,
            name:req.body.name,
            telephone:req.body.telephone,
            email:req.body.email,
            address:req.body.address,
            postalCode: req.body.postalCode,
            city: req.body.city,
            province: req.body.province
          }).exec().then((clientUpdated) =>{
            return res.status(201).json({
                'success': true,
                'message': 'Client with id '+req.body.id+' updated successfully!',
                'client': clientUpdated
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

export const deleteClient =  async (req, res) =>{
    try {
        await Client.findByIdAndDelete(req.body._id);
        return res.status(200).json({
            'success': true,
            'message': 'Product deleted successfully!'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
          });
    }
}

export const getClient = async (req, res) =>{
    try {
        let client = await Client.findOne({id:req.params.idClient});
        res.json(client);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
          });
    }
}