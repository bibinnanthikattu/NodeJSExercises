"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const client_1 = require("@prisma/client");
const lib_1 = require("./lib");
const planetValidationType_1 = require("./lib/planetValidationType");
const prisma = new client_1.PrismaClient();
const multer_1 = require("./middleware/multer");
const upload = (0, multer_1.initMulterMiddleware)();
const port = process.env.PORT;
// middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
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
        return next(`can't find item with id of ${planetId}`);
    }
    res.json(response);
});
// post route api
app.post("/planets", (0, lib_1.validate)({ body: planetValidationType_1.planetSchema }), async (req, res) => {
    const planet = req.body;
    const response = await prisma.planet.create({
        data: planet,
    });
    res.send(response);
    console.log(response);
});
// update route api
app.put("/planets/:id(\\d+)", (0, lib_1.validate)({ body: planetValidationType_1.planetSchema }), async (req, res, next) => {
    const planetId = Number(req.params.id);
    const planetData = req.body;
    try {
        const response = await prisma.planet.update({
            where: { id: planetId },
            data: planetData
        });
        res.json(response);
    }
    catch (error) {
        res.status(404);
        next(error);
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
    }
    catch (error) {
        res.status(422);
        next(error);
    }
});
// File upload route
app.post("/planets/:id(\\d+)/photo", upload.single("photo"), async (req, res, next) => {
    const planetId = Number(req.params.id);
    try {
        const file = req.file;
        if (!file) {
            res.status(400);
            return next("No file uploaded!");
        }
        else {
            const fileName = file.filename;
        }
    }
    catch (error) {
        res.status(400);
        next(error);
    }
});
// validationError middleware
app.use(lib_1.validationErrorMiddleware);
app.listen(5000, () => {
    console.log(`server is running on port: ${port} `);
});
