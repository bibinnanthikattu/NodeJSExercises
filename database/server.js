const Express = require("express");
const PrismaClient = require("@prisma/client").PrismaClient;
const {
  Validator,
  ValidationError,
} = require("express-json-validator-middleware");
require("dotenv").config();
const cors = require('cors');
const multer = require('multer');

const prisma = new PrismaClient();
const { validate } = new Validator();
const port = process.env.port;
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
  type: "object",
  required: ["name"],
  properties: {
    name: {
      type: "string",
      minLength: 1,
    },
    address: {
      type: "string",
      minLength: 1,
    },
  },
};

const storage = multer.diskStorage({   
  destination:(req, file, cb)=> { 
    cb(null, './uploads');    
 },  
  filename: function (req, file, cb) { 
     cb(null , file.originalname);   
  }
});
const upload = multer({ storage: storage });

// application level middlewares

app.use(Express.json());
app.use(cors());

// Routes
// get datas
app.get("/students", async (req, res) => {
  const response = await prisma.student.findMany();
  res.json(response);
});

// Post data
app.post("/students", validate({ body: studentSchema }), async (req, res) => {
  const studentData = req.body;
  const response = await prisma.student.create({
    data: studentData,
  });
  res.status(201).json(response);
});

// get a specific data

app.get("/student/:id(\\d+)", async (req, res) => {
  const studentId = Number(req.params.id);
  const response = await prisma.student.findUnique({
    where: { id: studentId },
  });
  res.json(response);
  console.log(typeof studentId);
});

// update data

app.put(
  "/student/:id(\\d+)",
  validate({ body: studentSchema }),
  async (req, res) => {
    try {
      const studentData = req.body;
      const studentId = Number(req.params.id);
      const response = await prisma.student.update({
        where: { id: studentId },
        data: studentData,
      });
      res.json(response);
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  }
);

// delete data
app.delete("/student/:id(\\d+)", async (req, res) => {
    const studentId = Number(req.params.id);
    const response = await prisma.student.delete({
      where: { id: studentId },
    });
    console.log('deleted succefully');
});
  
// Upload files
app.post("/student/:id(\\d+)/photo",upload.single("photo") ,async (req, res) => {
  console.log(req.file);
  res.send("file uploaded successfully")
});

// error midddleware
app.use(validationErrorMiddleware);

app.listen(port, () => {
  console.log(`sever is running on port ${port}`);
});
