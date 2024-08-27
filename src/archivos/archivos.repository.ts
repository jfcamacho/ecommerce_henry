import { Injectable } from "@nestjs/common";
import { UploadApiResponse } from "cloudinary";
import { v2 } from "cloudinary"
const  toStram = require("buffer-to-stream")

@Injectable()
export class ArchivosRepository{
    async uploadImage(file: Express.Multer.File): Promise<string>{
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream({
                resource_type: "auto"
            }, (error, result) => {
                if(error){
                    reject(error)
                }else{
                    resolve(result.secure_url)
                }
            })
            toStram(file.buffer).pipe(upload)
        })
    }
}