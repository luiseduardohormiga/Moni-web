import express from "express"
import {
    postularce,
    obtenerPostulados,
    obtenerPostularcion,
    actualizarPostularce,
    eliminarPostularcion,
} from "../controllers/postulacionController.js"
import checkAuth from "../middleware/checkAuth.js"


const router = express.Router()

    router.post("/", checkAuth, postularce)
    router.get("/", checkAuth, obtenerPostulados)
    
    router
        .route("/:id")
        .get(checkAuth, obtenerPostularcion)
        .put(checkAuth, actualizarPostularce)
        .delete(checkAuth, eliminarPostularcion)


export default router