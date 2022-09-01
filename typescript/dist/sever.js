"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const port = config_1.default.port;
app_1.default.listen(5000, () => {
    console.log(`server is running on port: ${port} `);
});
