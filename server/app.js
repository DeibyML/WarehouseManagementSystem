import express from 'express';
import postsRoutes from './routes/warehouse.routes.js';
import cors from 'cors';

const app = express()
app.use(cors());
//Middlewares
app.use(express.json())

//Routes
app.use(postsRoutes)

export default app