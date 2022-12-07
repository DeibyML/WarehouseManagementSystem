import Product from '../models/Product.js'

export const getProducts = async (req, res) =>{
    const products = await Product.find()
    res.send(products)
}

export const createProduct = async (req, res) =>{
    try{
        const {id,name, quantity, category, location, price } = req.body;
        const newProduct = new Product({id, name, quantity, category, location, price});
        await newProduct.save().then((productCreated)=>{
            return res.status(201).json({
                'success': true,
                'message': 'Product created successfully!',
                'product': productCreated
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

export const updateProduct =  async (req, res) =>{
    try{
        await Product.findByIdAndUpdate(req.body._id,{
            id:req.body.id,
            name:req.body.name,
            quantity:req.body.quantity,
            category:req.body.category,
            location:req.body.location,
            price: req.body.price
          }).exec().then((productUpdated) =>{
            return res.status(200).json({
                'success': true,
                'message': 'Product with id '+req.body.id+' updated successfully!',
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

export const deleteProduct =  async (req, res) =>{
    try {
        await Product.findByIdAndRemove(req.body._id)
        .exec().then(()=>{
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

export const getProduct = async (req, res) =>{
    try {
        let product = await Product.findOne({id:req.params.idProduct});
        res.json(product);

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
          });
    }
}