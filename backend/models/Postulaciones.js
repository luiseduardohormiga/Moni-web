import mongoose from "mongoose";

const postulacionesSchema = mongoose.Schema({
    Postulado:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    },
    pdf:{
        url: String,
        public_id: String,
    },
    convocatoria:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Convocatoria",
    },
    calificacionAdmin:{
        type: String,
        trim: true
    },
    calificacionInstructor:{
        type: String,
        trim: true
    },
    recomendacion:{
        type: String,
        trim: true
    },
    calificacionPsicologo:{
        type: String,
        trim: true
    },
    promedioCalificaciones:{
        type: String,
        trim: true,
    },
},{
    timestamps: true
})
const Postulacion = mongoose.model("Postulacion", postulacionesSchema)
export default Postulacion