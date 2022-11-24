import express from 'express'
import postsRoutes from './routes/warehouse.routes.js' 

const app = express()
//Middlewares
app.use(express.json())

//Routes
app.use(postsRoutes)

export default app