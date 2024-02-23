import Usuario from "../models/Usuarios.js";
import generarId from "../helpers/generarId.js";
import generarJTW from "../helpers/generarJWT.js";
import { emailRegistro, emailOlvidepassword } from "../helpers/email.js";

const obtenerUsuarios = async (req, res)=>{
    const usuarios = await Usuario.find();
    res.json(usuarios)
}
const registrar = async (req, res) =>{
    //evitar registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email })
    if (existeUsuario) {
        const error = new Error("Usuario ya Existe")
        return res.status(400).json({ msg: error.message })
    }
    
    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId()
        await usuario.save()

        //enviar email de confirmacion
        emailRegistro({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token
        })

        res.json({msg: 'Usuario creado correctamente, revza tu email y confirma tu cuenta'})
    } catch (error) {
        console.log(error) 
    }
}
const nuevoUsuario = async (req, res) =>{
    const usuario = new Usuario(req.body)
    //validar si existe el usuario
    const existeUsuario = await Usuario.findOne({ email })
    if (existeUsuario) {
        const error = new Error("Usuario ya Existe")
        return res.status(400).json({ msg: error.message })
    }
    //guardar datos del usuario
    try {
        const usuaruioAlmacenado = await usuario.save()
        res.json(usuaruioAlmacenado)
        res.json({msg: 'usuario creado correctamente, reviza el email para confirmar la cuenta'})
    } catch{
        console.log(error)
    }
}
const autenticar = async (req, res) =>{
    const {email, password} = req.body

    //comprobar si el usuario existe
    const usuario = await Usuario.findOne({email})
    if (!usuario) {
        const error = new Error("el usuario no existe")
        return res.status(404).json({msg: error.message})
    } 
    //comprobar la si esta confirmado   
    if (!usuario.confirmado) {
        const error = new Error("cuenta no confirmada")
        return res.status(403).json({msg: error.message})
    } 
    //comprobar password
        if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            tipo_documento: usuario.tipo_documento,
            N_documento: usuario.N_documento,
            P_formacion: usuario.P_formacion,
            ficha: usuario.ficha,
            email: usuario.email,
            rol: usuario.rol,
            token: generarJTW(usuario._id),
        })
        } else {
            const error = new Error("contraseña incorecta")
            return res.status(403).json({msg: error.message})
        }
    
}
const confirmar = async (req, res) => {
    //validar token
    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({token})
    if (!usuarioConfirmar) {
        const error = new Error("token no valido")
        return res.status(403).json({msg: error.message})
    }
    //confirmar usuario
    try {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = ""
        await usuarioConfirmar.save()
        res.json({msg: 'Usuario confirmado correctamente'}) 
    } catch (error) {
        console.log(error)
    }
}
const olvidePassword = async (req, res) =>{
    const { email } = req.body
    //validar usuario existente
    const usuario = await Usuario.findOne({email})
        if (!usuario) { 
            const error = new Error("el usuario no existe")
            return res.status(404).json({msg: error.message})
        } 
        try {
            usuario.token = generarId()
            await usuario.save()
            //enviar al email de nueva confirmacion
        emailOlvidepassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token  
        })
            res.json({msg: 'Hemos enviado un email con las instrucciones'})
        } catch (error) {
            console.log(usuario) 
        }
}
const comprobarToken = async (req, res) => {
    const { token } = req.params
    //comprobar token
    const tokenValido = await Usuario.findOne({ token })

    if (tokenValido) {
        res.json({msg: "token valido y el usuario existe"})
    }else{
        const error = new Error("token no valido")
        return res.status(404).json({msg: error.message})
    }
}
const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    //validar token
    const usuario = await Usuario.findOne({ token })
    if (usuario) {
        usuario.password = password
        usuario.token = ''
        try {
            //guardar nueva contraseña
            await usuario.save()
            res.json({msg: "contraseña modificada"})
        } catch (error) {
            console.log(error)
        }
    }else{
        const error = new Error("token no valido")
        return res.status(404).json({msg: error.message})
    }
}
const obtenerUsuario = async (req, res)=>{
    const { id } = req.params
    const usuario = await Usuario.findById(id)
    res.json(usuario)
}
const editarUsuario = async (req, res)=>{
    const { id } = req.params  // Extraer el parámetro 'id' de la solicitud
    const usuario = await Usuario.findById(id) // Buscar un usuario en la base de datos por su 'id'
    if (!usuario) { // Verificar si el usuario no fue encontrado en la base de datos
        const error = new Error("No encontrada")
        return res.status(404).json({msg: error.message})
    }
    // Actualizar los campos del usuario con los valores proporcionados en la solicitud,
    // si no se proporciona un nuevo valor, se mantiene el valor existente
    usuario.nombre = req.body.nombre || usuario.nombre
    usuario.apellido = req.body.apellido || usuario.apellido
    usuario.tipo_documento = req.body.tipo_documento || usuario.tipo_documento
    usuario.N_documento = req.body.N_documento || usuario.N_documento
    usuario.P_formacion = req.body.P_formacion || usuario.P_formacion
    usuario.ficha = req.body.ficha || usuario.ficha
    usuario.email = req.body.email || usuario.email
    usuario.rol = req.body.rol || usuario.rol
    try {
        //guarda los cambios 
        const usuarioAlmacenado = await usuario.save()
        res.json(usuarioAlmacenado)
        res.json({msg: 'datos del usuario actualizado correctamente'})
    } catch (error) {
        console.log(error)
    }
}
const perfil = async (req, res) =>{
    const { usuario } = req

    res.json(usuario)
}
const eliminarUsuario = async (req, res)=>{
    const { id } = req.params
    const usuario = await Usuario.findById(id)
    if (!usuario) {
        const error = new Error("No encontrada")
        return res.status(404).json({msg: error.message})
    }
    
    try {
        await usuario.deleteOne()
        res.json({msg: "usuario Eliminado"})
    } catch (error) {
        console.log(error)
    }
}
export { 
    obtenerUsuarios,
    registrar, 
    nuevoUsuario,
    autenticar, 
    confirmar, 
    olvidePassword, 
    comprobarToken, 
    nuevoPassword,
    obtenerUsuario,
    editarUsuario,
    perfil,
    eliminarUsuario
};