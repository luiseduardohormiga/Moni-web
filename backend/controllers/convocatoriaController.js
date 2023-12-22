import Convocatoria from "../models/Convocatorias.js"
import Postulacion from "../models/Postulaciones.js"

const obtenerConvocatorias = async (req, res)=>{
    const convocatorias = await Convocatoria.find().select("-postulados")
    res.json(convocatorias)
}

const nuevaConvocatoria = async (req, res)=>{
    if (req.usuario.rol === "admin") {
        const convocatoria = new Convocatoria(req.body)
        convocatoria.creador = req.usuario._id
        try {
            const convocatoriaAlmacenada = await convocatoria.save()
            res.json(convocatoriaAlmacenada)
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error("un aprendiz no pude hacer eso")
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
    if (convocatoria.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error("Accion no valida")
        return res.status(401).json({msg: error.message})
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
        await convocatoria.deleteOne()
        res.json({msg: "convocatoria Eliminada"})
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