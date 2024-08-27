import { v2 } from "cloudinary"
import { config as ConfigDotEnv } from "dotenv"

ConfigDotEnv({ path: ".env.development"})

export const CloudinaryConfig = {
    provide: "cloudinary",
    useFactory: () => {
        return v2.config({
            cloud_name: process.env.CLOUDINARY_API_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        })
    }
}