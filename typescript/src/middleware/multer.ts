import multer from "multer";
import mime from "mime";
import { randomUUID } from "crypto";

export const generateFileName = (mimeType: string) => {
    const randomFilename = `${randomUUID()}-${Date.now()}`;
    const fileExtension = mime.getExtension(mimeType);
    const fileName = `${randomFilename}.${fileExtension}`;
    return fileName;
}

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        return cb(null,generateFileName(file.mimetype))
    }
})

export const multerOptions = {};

export const initMulterMiddleware = () => {
    return multer({storage, ...multerOptions})
};