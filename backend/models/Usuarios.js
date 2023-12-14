import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    apellido: {
        type: String,
        require: true,
        trim: true
    },
    tipo_documento: {
        type: String, 
        require: true,
        trim: true,
        enum: ['TI', 'CC', 'CE']
    },
    N_documento: {
        type: String,
        require: true,
        trim: true
    },
    P_formacion: {
        type: String,
        require: true,
        trim: true
    },
    ficha: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    token:{
         type: String
    },
    confirmado:{
        type: Boolean,
        default: false
    },
    rol:{
        type: String, 
        require: true,
        trim: true,
        enum: ['Aprendiz', 'admin', 'instructor', 'psicologo'],
        default: 'Aprendiz'
    },
},
{
    timestamps: true,
});
usuarioSchema.pre('save', async function(next){
    if (!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Usuario = mongoose.model("Usuario", usuarioSchema )
export default Usuario;