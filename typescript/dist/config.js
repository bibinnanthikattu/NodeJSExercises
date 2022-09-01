"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MISSING_SETTINGS = "Warning: no value is for enviornment variable";
const config = {
    "port": process.env.PORT || MISSING_SETTINGS
};
exports.default = config;
