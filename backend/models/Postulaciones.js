import mongoose from "mongoose";

const postulacionesSchema = mongoose.Schema({
    Postulado:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    },
    pdf:{
        url: String,
        public_id: String,
        //trim: true,
        //require: true,
    },
    convocatoria:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Convocatoria",
    },
    idAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    },
    calificacionAdmin:{
        type: String,
        trim: true
    },
    idInstructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    },
    calificacionInstructor:{
        type: String,
        trim: true
    },
    idPsicologo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    },
    calificacionPsicologo:{
        type: String,
        trim: true
    },
},{
    timestamps: true
})
const Postulacion = mongoose.model("Postulacion", postulacionesSchema)
export default Postulacion