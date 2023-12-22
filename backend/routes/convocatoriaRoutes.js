import express from 'express'
import {
    obtenerConvocatorias,
    nuevaConvocatoria,
    obtenerConvocatoria,
    editarConvocatoria,
    eliminarConvocatoria,
} from '../controllers/convocatoriaController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router
    .route('/')
    .get(obtenerConvocatorias)
    .post(checkAuth, nuevaConvocatoria)

router
    .route('/:id')
    .get(checkAuth, obtenerConvocatoria)
    .put(checkAuth, editarConvocatoria)
    .delete(checkAuth, eliminarConvocatoria)



    //.get(checkAuth, obtenerConvocatorias)
//router.get('/postulacion/:id', checkAuth, obtenerPostulaciones)

export default router