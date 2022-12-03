import Product from '../models/Product.js'

export const getProducts = async (req, res) =>{
    const products = await Product.find()
    res.send(products)
}

export const createProduct = async (req, res) =>{
    try{
        const {id,name, quantity, category, location, price } = req.body;
        const newProduct = new Product({id, name, quantity, category, location, price});
        await newProduct.save();
        return res.json({
            'status':200,
            'message': 'Product created successfully!'
        });
    }catch(error){
        res.json(error);
        console.error(error);
    }
}

export const updateProduct =  (req, res) =>{
    res.json({
        status: 'Updated product with Id:' + req.params.idProduct
    });
}

export const deleteProduct =  async (req, res) =>{
    try {
        await Product.findByIdAndRemove(req.params.idProduct);
        res.json("Product deleted successfully!");

    } catch (error) {
        res.json(error);
        console.error(error);
    }
}

export const getProduct = async (req, res) =>{
    try {
        let product = await Product.findById(req.params.idProduct);
        res.json(product);

    } catch (error) {
        res.json(error);
        console.error(error);
    }
}