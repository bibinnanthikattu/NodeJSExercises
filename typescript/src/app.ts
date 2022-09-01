

import express from "express";
import cors from 'cors'
import { appendFile } from "fs";
const app = express();
import { validationErrorMiddleware } from './lib/index';
import planetRoutes from './routes/planet'

// middleware
app.use(express.json());
app.use(cors())
app.use("/planets",planetRoutes)



// validationError middleware
app.use(validationErrorMiddleware);

export default app;