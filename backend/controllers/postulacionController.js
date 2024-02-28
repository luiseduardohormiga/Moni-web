import Convocatoria from "../models/Convocatorias.js"
import Postulacion from "../models/Postulaciones.js"
import { uploadFile, deleteFile } from "../libs/cloudinary.js"
import fs from 'fs-extra'

const postularce = async (req, res) => {
    const { convocatoria } = req.body
    const { _id: userId } = req.usuario

    //usuario solo puede postularse una sola vez
    const existePostulacion = await Postulacion.findOne({ convocatoria, Postulado: userId });
    if (existePostulacion) {
        // Si el usuario ya está postulado, devolver un error
        return res.status(400).json({ msg: "El usuario ya está postulado a esta convocatoria" });
    }
    //verificar que la convocatoria exista
    const existeConvocatoria = await Convocatoria.findById(convocatoria)
    if (!existeConvocatoria) {
        const error = new Error("la convocatoria no existe")
        return res.status(404).json({msg: error.message})
    }
    let pdf;
        if (req.files?.pdf) {
            const result = await uploadFile(req.files.pdf.tempFilePath)
            await fs.remove(req.files.pdf.tempFilePath)
            pdf = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }

    const postulacion = new Postulacion({
        ...req.body,
        pdf,
    })

    postulacion.Postulado = req.usuario._id
        try { 
            const postulacionAlmacenada = await postulacion.save()
            //guarda id de la convocatoria
            existeConvocatoria.postulados.push(postulacionAlmacenada._id)
            await existeConvocatoria.save()
            res.json(postulacionAlmacenada)
        } catch (error) {
            console.log(error)
        }
}

const actualizarPostularce = async (req, res) => {
    const { id } = req.params
    const postulacion = await Postulacion.findById(id).populate("convocatoria")
    
    if (!postulacion) {
        const error = new Error("postulacion no existe")
        return res.status(404).json({msg: error.message})
    }
    //postulacion.archivoPDF = req.body.archivoPDF || postulacion.archivoPDF
    postulacion.calificacionAdmin = req.body.calificacionAdmin || postulacion.calificacionAdmin
    postulacion.calificacionInstructor = req.body.calificacionInstructor || postulacion.calificacionInstructor
    postulacion.calificacionPsicologo = req.body.calificacionPsicologo || postulacion.calificacionPsicologo
    try {
        const postulacionAlmacenada = await postulacion.save()
        res.json(postulacionAlmacenada)
    } catch (error) {
        console.log(error)
    }
}
const obtenerPostulados = async (req, res)=>{
    const postulados = await Postulacion.find();
    res.json(postulados)
}

const obtenerPostularcion = async (req, res) => {
    const { id } = req.params
    const postulacion = await Postulacion.findById(id)
    res.json(postulacion)
}
const eliminarPostularcion = async (req, res) => {
    const { id } = req.params
    const postulacion = await Postulacion.findById(id).populate("convocatoria")
    
    if (!postulacion) {
        const error = new Error("postulacion no existe")
        return res.status(404).json({msg: error.message})
    }
    try {
        if (postulacion.pdf.public_id) {
            await deleteFile(postulacion.pdf.public_id)
        }
        await postulacion.deleteOne()
        res.json({msg: 'postulacion eliminada'})
        //console.log(postulacion)
    } catch (error) {
        console.log(error)
    }
}


export {
    postularce,
    obtenerPostulados,
    obtenerPostularcion,
    actualizarPostularce,
    eliminarPostularcion,
}

