import mongoose from "mongoose";

const convocatoriasSchema = mongoose.Schema({
    titulo:{
        type: String,
        trim: true,
        require:true,
    },
    descripcion:{
        type: String,
        trim: true,
        require: true,
    },
    img:{
        type: String,
        trim: true,
        require: true,
    },
    fechaInicio:{
        type: Date,
        default: Date.now(),
    },
    fechaFinalizacion:{
        type: Date,
        default: Date.now(),
    },
    postulados:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Postulacion"
        }
    ],
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    }
},{
    timestamps: true,
})
const Convocatoria = mongoose.model('Convocatoria', convocatoriasSchema)
export default Convocatoria