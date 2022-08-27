const Express  =require('express');
const PrismaClient = require('@prisma/client').PrismaClient;
require('dotenv').config()
const prisma = new PrismaClient();
const port = process.env.port
const app = Express();

// Routes
app.get('/students', async (req, res) => {
    const response = await prisma.student.findMany();
    res.json(response)
})


app.listen(port, () => {
    console.log(`sever is running on port ${port}`);
})