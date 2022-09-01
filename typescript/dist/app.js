"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const index_1 = require("./lib/index");
const planet_1 = __importDefault(require("./routes/planet"));
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/planets", planet_1.default);
// validationError middleware
app.use(index_1.validationErrorMiddleware);
exports.default = app;
