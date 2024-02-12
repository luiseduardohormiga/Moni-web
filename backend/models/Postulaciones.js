import mongoose from "mongoose";

const postulacionesSchema = mongoose.Schema({
    Postulado:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Usuario"
    },
    archivoPDF:{
        type: String,
        require: true,
        trim: true,
    },
    convocatoria:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Convocatoria",
    },
},{
    timestamps: true
})
const Postulacion = mongoose.model("Postulacion", postulacionesSchema)
export default Postulacion