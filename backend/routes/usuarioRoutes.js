import express from "express";

import { 
    obtenerUsuarios,
    registrar, 
    autenticar, 
    confirmar, 
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    obtenerUsuario,
    editarUsuario,
    nuevoUsuario,
    perfil,
    eliminarUsuario
} from "../controllers/usuarioController.js"
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post('/', registrar); // creacion de usuarios
router.post("/login", autenticar)
router.get("/confirmar/:token", confirmar)
router.post("/olvide-password", olvidePassword)
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)
router.get('/perfil', checkAuth, perfil)
//router.get('/:id', checkAuth, obtenerUsuarios)

router
    .route('/')
    .get(checkAuth, obtenerUsuarios)
    .post(checkAuth, nuevoUsuario)

    router
    .route('/:id')
    .get(checkAuth, obtenerUsuario)
    .put(checkAuth, editarUsuario)
    .delete(checkAuth, eliminarUsuario)

router.put('/:id', checkAuth, editarUsuario)

export default router