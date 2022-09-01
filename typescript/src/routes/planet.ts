import express, { Router } from 'express';

import { PrismaClient } from "@prisma/client";
import { validate } from "../lib";
import { planetData, planetSchema } from "../lib/planetValidationType";
const prisma = new PrismaClient();
import { initMulterMiddleware } from "../middleware/multer";
const upload = initMulterMiddleware()

const route = Router();
// get route api
route.get("/", async (req, res) => {
    const planet = req.body;
  const response = await prisma.planet.findMany();
  res.json(response);
  console.log("success!!");
});
// get a specific item
route.get("/:id(\\d+)", async (req, res, next) => {
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
route.post("",validate({body:planetSchema}), async (req, res) => {
  const planet: planetData = req.body;
  const response = await prisma.planet.create({
    data: planet,
  });
  res.send(response);
  console.log(response);
});

// update route api
route.put("/:id(\\d+)", validate({ body: planetSchema }), async (req, res, next) => {
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
route.delete("/:id(\\d+)", async (req, res, next) => {
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
route.post("/:id(\\d+)/photo", upload.single("photo"), async (req, res, next) => {
   
    if (!req.file) {
        res.status(422);
        return next("No file uploaded!")
    }

    const planetId = Number(req.params.id);
    const photoFilename = req.file.filename;
    try {
        await prisma.planet.update({
            where: { id: planetId },
            data: {photoFilename}  
        });
        res.status(201).send()

    } catch (error) {
        res.status(404);
        next(error)
    }
        
    
})
// middleware for displaying image in browser
route.use("planets/photo", express.static("uploads"));

export default route;