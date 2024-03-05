import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: "dbt6xuonu",
    api_key: "381393339692258",
    api_secret: "gOM9oVyNTqwFuC9-AiI5m4ABf5w"
})

//IMG
export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'convocatorias'
    })
}
export const deleteImg = async id => {
    return await cloudinary.uploader.destroy(id)
}

export const uploadFile = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'archivos',
        resource_type: 'auto',
        type: 'upload'
    })
}

export const deleteFile = async id => {
    return await cloudinary.uploader.destroy(id)
}