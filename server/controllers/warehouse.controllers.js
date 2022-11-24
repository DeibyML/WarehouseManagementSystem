import Product from '../models/Product.js'
export const getProducts = async (req, res) =>{
    const products = await Product.find()
    res.send(products)
}

export const createProduct = async (req, res) =>{
    const {id,name, quantity, category, location, price } = req.body

    const newProduct = new Product({name, quantity, category, location, price})
    await newProduct.save()
    return res.json(newProduct)
}

export const updateProduct =  (req, res) =>res.send('updating a product')

export const deleteProduct =  (req, res) =>res.send('deleting a product')

export const getProduct = (req, res) =>res.send('getting a product')