import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";
import "dotenv/config";


export const localUpload = multer({dest: 'uploads'});

export const remoteUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken: process.env.SAVEFILESORG_API_KEY,
        relativePath:'/uploads/*'
    })
});