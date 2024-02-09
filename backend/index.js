import express from "express"
import conectarDB from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors"
import usuarioRoutes from './routes/usuarioRoutes.js'
import convocatoriaRoutes from './routes/convocatoriaRoutes.js'
import postulacionRoutes from './routes/postulacionRoutes.js'
import fileUpload from "express-fileupload";

const app = express();
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

dotenv.config();
conectarDB();

//cors
const whitelist = [process.env.FRONTEND_URL]

const corsOptions ={
    origin: function(origin, callback){
        if (whitelist.includes(origin)) {
            //permitido
            callback(null, true)
        } else {
            //no permitido
            callback(new Error("Error de cors"))
        }
    }
}
app.use(cors(corsOptions))

//imagen
//app.use(express.static("public"))

//routing 
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/convocatorias', convocatoriaRoutes)
app.use('/api/postulaciones', postulacionRoutes)

const PORT = process.env.PORT || 4000;

app.listen(4000, () =>{
    console.log(`servidor corriendo en el puerto ${PORT}`)
})