"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const client_1 = require("@prisma/client");
const lib_1 = require("../lib");
const planetValidationType_1 = require("../lib/planetValidationType");
const port = process.env.PORT;
const prisma = new client_1.PrismaClient();
// middlewares
app.use(express_1.default.json());
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
// validationError middleware
app.use(lib_1.validationErrorMiddleware);
app.listen(5000, () => {
    console.log(`server is running on port: ${port} `);
});
