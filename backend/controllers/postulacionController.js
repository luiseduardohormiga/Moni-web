import Convocatoria from "../models/Convocatorias.js"
import Postulacion from "../models/Postulaciones.js"
import { uploadFile, deleteFile } from "../libs/cloudinary.js"
import fs from 'fs-extra'

const postularse = async (req, res) => {
    const { convocatoria } = req.body
    const { _id: userId } = req.usuario

    //verificar que la convocatoria exista
    const existeConvocatoria = await Convocatoria.findById(convocatoria)
    if (!existeConvocatoria) {
        const error = new Error("la convocatoria no existe")
        return res.status(404).json({ msg: error.message })
      }
    //verifica si la convocatoria ya termino
    const fechaActual = new Date()
    if (existeConvocatoria.fechaFinalizacion && existeConvocatoria.fechaFinalizacion < fechaActual) {
        return res.status(400).json({ msg: "La convocatoria ha finalizado, no se puede postular" });
    }
    
    //usuario solo puede postularse una sola vez
    const existePostulacion = await Postulacion.findOne({ convocatoria, Postulado: userId });
    if (existePostulacion) {
        // Si el usuario ya está postulado, devolver un error
        return res.status(400).json({ msg: "El usuario ya está postulado a esta convocatoria" });
    }
    //manejo del PDF 
    let pdf;
    if (req.files?.pdf) {
        const result = await uploadFile(req.files.pdf.tempFilePath)
        await fs.remove(req.files.pdf.tempFilePath)
        pdf = {
            url: result.secure_url,
            public_id: result.public_id
        }
    }
    //crear la postulacion
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
function calcularPromedio(calificacionAdmin, calificacionInstructor, calificacionPsicologo) {
    // Suma de las tres calificaciones
    const sumaTotal = calificacionAdmin + calificacionInstructor + calificacionPsicologo;
    // Promedio de las calificaciones
    const promedio = Math.floor(sumaTotal / 3);
    return promedio;
}
const actualizarPostularse = async (req, res) => {
    const { id } = req.params
    try {
        const postulacion = await Postulacion.findById(id).populate("convocatoria")
        if (!postulacion) {
            const error = new Error("postulacion no existe")
            return res.status(404).json({ msg: error.message })
        }
        // Calcula el promedio de las calificaciones
        const promedioCalificaciones = calcularPromedio(
            parseInt(req.body.calificacionAdmin),
            parseInt(req.body.calificacionInstructor),
            parseInt(req.body.calificacionPsicologo)
        );
        // Actualizar imagen si se envía una nueva imagen
        if (req.files?.pdf) {
            const result = await uploadFile(req.files.pdf.tempFilePath)
            // Eliminar archivo anterior del Cloudinary
            if (postulacion.pdf && postulacion.pdf.public_id) {
                await deleteFile(postulacion.pdf.public_id);
            }
            postulacion.pdf = {
                url: result.secure_url,
                public_id: result.public_id
            }
            // Eliminar el archivo temporal de la imagen
            await fs.remove(req.files.pdf.tempFilePath);
        }
        postulacion.calificacionAdmin = req.body.calificacionAdmin || postulacion.calificacionAdmin
        postulacion.calificacionInstructor = req.body.calificacionInstructor || postulacion.calificacionInstructor
        postulacion.calificacionPsicologo = req.body.calificacionPsicologo || postulacion.calificacionPsicologo
        postulacion.recomendacion = req.body.recomendacion || postulacion.recomendacion
        postulacion.promedioCalificaciones = promedioCalificaciones;
        
        const postulacionAlmacenada = await postulacion.save()
        res.json(postulacionAlmacenada)
    } catch (error) {
        console.log(error)
    }
}
const obtenerPostulados = async (res) => {
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
        return res.status(404).json({ msg: error.message })
    }
    try {
        if (postulacion.pdf.public_id) {
            await deleteFile(postulacion.pdf.public_id)
        }
        await postulacion.deleteOne()
        res.json({ msg: 'postulacion eliminada' })
        //console.log(postulacion)
    } catch (error) {
        console.log(error)
    }
}

export {
    postularse,
    obtenerPostulados,
    obtenerPostularcion,
    actualizarPostularse,
    eliminarPostularcion,
}

