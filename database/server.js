const Express  =require('express');
const PrismaClient = require('@prisma/client').PrismaClient;
const { Validator,ValidationError } = require("express-json-validator-middleware");
require('dotenv').config()
const prisma = new PrismaClient();
const {validate} = new Validator()
const port = process.env.port
const app = Express();

// Validation Error

function validationErrorMiddleware(error, request, response, next) {
	if (response.headersSent) {
		return next(error);
	}

	const isValidationError = error instanceof ValidationError;
	if (!isValidationError) {
		return next(error);
	}

	response.status(400).json({
		errors: error.validationErrors,
	});

	next();
}

// json schema

const studentSchema = {
    type: 'object',
    required: ["name"],
    properties: {
        name: {
            type: "string",
            minLength:1
        },
        address: {
            type: "string",
            minLength:1
        }
    }
    
}
app.use(Express.json())
// Routes
app.get('/students', async (req, res) => {
    const response = await prisma.student.findMany();
    res.json(response)
})

app.post('/students', validate({ body: studentSchema }), async (req, res) => {
    res.json(req.body);
    console.log(req.body);
});

app.use(validationErrorMiddleware)

app.listen(port, () => {
    console.log(`sever is running on port ${port}`);
})