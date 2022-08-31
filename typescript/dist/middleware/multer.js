"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMulterMiddleware = exports.multerOptions = exports.generateFileName = void 0;
const multer_1 = __importDefault(require("multer"));
const mime_1 = __importDefault(require("mime"));
const crypto_1 = require("crypto");
const generateFileName = (mimeType) => {
    const randomFilename = `${(0, crypto_1.randomUUID)()}-${Date.now()}`;
    const fileExtension = mime_1.default.getExtension(mimeType);
    const fileName = `${randomFilename}.${fileExtension}`;
    return fileName;
};
exports.generateFileName = generateFileName;
const storage = multer_1.default.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        return cb(null, (0, exports.generateFileName)(file.mimetype));
    }
});
exports.multerOptions = {};
const initMulterMiddleware = () => {
    return (0, multer_1.default)({ storage, ...exports.multerOptions });
};
exports.initMulterMiddleware = initMulterMiddleware;
