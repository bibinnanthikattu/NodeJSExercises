import "dotenv/config";
import express from "express";
import cors  from 'cors'
const app = express();
import { PrismaClient } from "@prisma/client";
import { validate ,validationErrorMiddleware} from "./lib";
import { planetData, planetSchema } from "./lib/planetValidationType";
const prisma = new PrismaClient();
import { initMulterMiddleware } from "./middleware/multer";
const upload = initMulterMiddleware()

const port = process.env.PORT;
// middlewares
app.use(express.json());
app.use(cors())

// get route api
app.get("/planets", async (req, res) => {
    const planet = req.body;
  const response = await prisma.planet.findMany();
  res.json(response);
  console.log("success!!");
});
// get a specific item
app.get("/planets/:id(\\d+)", async (req, res, next) => {
    const planetId = Number(req.params.id);
    const response = await prisma.planet.findUnique({
        where: { id: planetId }
    });
    if (!response) {
        res.status(404);
        return next(`can't find item with id of ${planetId}`)
    }
    res.json(response);
    
});

// post route api
app.post("/planets",validate({body:planetSchema}), async (req, res) => {
  const planet: planetData = req.body;
  const response = await prisma.planet.create({
    data: planet,
  });
  res.send(response);
  console.log(response);
});

// update route api
app.put("/planets/:id(\\d+)", validate({ body: planetSchema }), async (req, res, next) => {
    const planetId = Number(req.params.id);
    const planetData: planetData = req.body;
    try {
        const response = await prisma.planet.update({
            where: { id: planetId },
            data: planetData
        })
        res.json(response)
    } catch (error) {
        res.status(404)
        next(error)
    }
});

// Delete route api
app.delete("/planets/:id(\\d+)", async (req, res, next) => {
    const planetId = Number(req.params.id);
    try {
        const resposne = await prisma.planet.delete({
            where: { id: planetId },
        });
        console.log('deleted successfully');
    } catch (error) {
        res.status(422)
        next(error)
    }
});
// File upload route
app.post("/planets/:id(\\d+)/photo", upload.single("photo"), async (req, res, next) => {
    const planetId = Number(req.params.id);
    try {
        const file = req.file
        if (!file) {
            res.status(400);
            return next("No file uploaded!")
        } else {
            const fileName=file.filename
        }
    } catch (error) {
        res.status(400);
        next(error)
    }
})

// validationError middleware
app.use(validationErrorMiddleware)

app.listen(5000, () => {
  console.log(`server is running on port: ${port} `);
});
