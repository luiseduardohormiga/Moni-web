import Convocatoria from "../models/Convocatorias.js"
import Postulacion from "../models/Postulaciones.js"
import { uploadImage, deleteImg } from "../libs/cloudinary.js"
import fs from 'fs-extra'

const obtenerConvocatorias = async (req, res)=>{
    const convocatorias = await Convocatoria.find().select("-postulados")
    res.json(convocatorias)
}

const nuevaConvocatoria = async (req, res)=>{
    if (req.usuario.rol === "admin") {
        let img;
        if (req.files?.img) {
            const result = await uploadImage(req.files.img.tempFilePath)
            await fs.remove(req.files.img.tempFilePath)
            img = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

    const convocatoria = new Convocatoria({
        ...req.body,
        img,
    })

        convocatoria.creador = req.usuario._id
        try { 
            const convocatoriaAlmacenada = await convocatoria.save()
            res.json(convocatoriaAlmacenada)
            console.log(convocatoriaAlmacenada)
        } catch (error) {
            console.log(error)
        }

    } else {
        const error = new Error("no cuentas con el permiso")
        return res.status(401).json({msg: error.message})
    }
    
}

const obtenerConvocatoria = async (req, res)=>{
    const { id } = req.params
    const convocatoria = await Convocatoria.findById(id).populate("postulados")
    if (!convocatoria) {
        const error = new Error("No encontrada")
        return res.status(404).json({msg: error.message})
    }
    
    //obtener los postulados de la convocatoria
    const postulados = await Postulacion.find().where('convocatoria').equals(convocatoria._id)
    res.json( convocatoria )
}
const editarConvocatoria = async (req, res)=>{
    const { id } = req.params
    const convocatoria = await Convocatoria.findById(id)
    if (!convocatoria) {
        const error = new Error("No encontrada")
        return res.status(404).json({msg: error.message})
    }
    if (convocatoria.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(401).json({msg: error.message})
    }
    convocatoria.titulo = req.body.titulo || convocatoria.titulo
    convocatoria.descripcion = req.body.descripcion || convocatoria.descripcion
    convocatoria.fechaInicio = req.body.fechaInicio || convocatoria.fechaInicio
    convocatoria.fechaFinalizacion = req.body.fechaFinalizacion || convocatoria.fechaFinalizacion

    try {
        const convocatoriaAlmacenada = await convocatoria.save()
        res.json(convocatoriaAlmacenada)
    } catch (error) {
        console.log(error)
    }
}
const eliminarConvocatoria = async (req, res)=>{
    const { id } = req.params
    const convocatoria = await Convocatoria.findById(id)
    if (!convocatoria) {
        const error = new Error("No encontrada")
        return res.status(404).json({msg: error.message})
    }
    if (convocatoria.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(401).json({msg: error.message})
    }
    try {
        if (convocatoria.img.public_id) {
            await deleteImg(convocatoria.img.public_id)
        }
        await convocatoria.deleteOne()
        res.json({msg: "convocatoria Eliminada"})
        //console.log(convocatoria)
    } catch (error) {
        console.log(error)
    }
}

export {
    obtenerConvocatorias,
    nuevaConvocatoria,
    obtenerConvocatoria,
    editarConvocatoria,
    eliminarConvocatoria,
}