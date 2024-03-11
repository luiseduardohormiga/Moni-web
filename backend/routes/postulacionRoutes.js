import express from "express"
import {
    postularse,
    obtenerPostulados,
    obtenerPostularcion,
    actualizarPostularse,
    eliminarPostularcion,
} from "../controllers/postulacionController.js"
import checkAuth from "../middleware/checkAuth.js"


const router = express.Router()

    router.post("/", checkAuth, postularse)
    router.get("/", checkAuth, obtenerPostulados)
    
    router
        .route("/:id")
        .get(checkAuth, obtenerPostularcion)
        .put(checkAuth, actualizarPostularse)
        .delete(checkAuth, eliminarPostularcion)


export default router