import { v2 as cloudinary } from 'cloudinary'
import fileUpload from 'express-fileupload'

cloudinary.config({
    cloud_name: "dbt6xuonu",
    api_key: "381393339692258",
    api_secret: "gOM9oVyNTqwFuC9-AiI5m4ABf5w"
})

export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'convocatorias'
    })
}

export const deleteImg = async id => {
    return await cloudinary.uploader.destroy(id)
}