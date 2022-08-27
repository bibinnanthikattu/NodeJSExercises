const Express  =require('express');
const PrismaClient = require('@prisma/client').PrismaClient;
require('dotenv').config()
const prisma = new PrismaClient();
const port = process.env.port
const app = Express();

app.listen(port, () => {
    console.log(`sever is running on port ${port}`);
})