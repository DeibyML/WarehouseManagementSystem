import Client from '../models/Client.js'

export const getClients = async (req, res) =>{
    const clients = await Client.find()
    res.send(clients)
}

export const createClient = async (req, res) =>{
    try{
        const {id,name, quantity, category, location, price } = req.body;
        const newClient = new Client({id, name, quantity, category, location, price});
        await newClient.save();
        return res.json({
            'status':200,
            'message': 'Client created successfully!'
        });
    }catch(error){
        res.json(error);
        console.error(error);
    }
}

export const updateClient =  (req, res) =>{
    res.json({
        status: 'Updated client with Id:' + req.params.idClient
    });
}

export const deleteClient =  async (req, res) =>{
    try {
        await Client.findByIdAndRemove(req.params.idClient);
        res.json("Client deleted successfully!");

    } catch (error) {
        res.json(error);
        console.error(error);
    }
}

export const getClient = async (req, res) =>{
    try {
        let client = await Client.findById(req.params.idClient);
        res.json(client);

    } catch (error) {
        res.json(error);
        console.error(error);
    }
}