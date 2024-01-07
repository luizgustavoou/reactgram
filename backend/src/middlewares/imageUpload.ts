import multer from "multer";
import path from "path";
import { BadRequestError } from "../exceptions/BadRequestError";


const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "";

        console.log(file)
        if (req.baseUrl.includes("users")) {
            folder = "users";
        } else if (req.baseUrl.includes("photos")) {
            folder = "photos";
        }

        const pathImage = path.join(__dirname, '../uploads', folder);

        cb(null, pathImage);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const imageUpload = multer({
    storage: imageStorage, fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new BadRequestError("Por favor, envie apenas png ou jpg!"))
        }

        cb(null, true);
    },
});