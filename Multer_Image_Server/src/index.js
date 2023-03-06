import cors from 'cors';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import { success, error } from 'consola';

import { PORT } from './config';

// Import Routes
import imagesRoutes from './routes/images';

// Initialize the express application
const app = express();

// Inject the middlewares to our app Object
app.use(cors());
app.use(bodyParser.json());

// Injecting routes in main app
app.use('/api/images', imagesRoutes);

app.get("/",(req,res)=>
{
    res.send("hello image server")
});

// Setting up the express static directory
app.use(express.static(path.join(__dirname, './public')));

// Starting Application Function
const startApp = () => {
    app.listen(PORT, () => success({ badge: true, message: `Server started on port ${PORT}` }));
};

startApp();