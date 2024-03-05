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

//origin: "*"  para todos
const corsOptions ={
    origin: function (requestOrigin, callback) {
        if (process.env.NODE_ENV === 'development') {
            callback(null, true); // Permitir todas las solicitudes durante el desarrollo local
        } else {
            if (whitelist.includes(requestOrigin)) {
                callback(null, true); // Permitir solicitudes desde los orígenes de la lista blanca
            } else {
                callback(new Error('No permitido por CORS')); // Bloquear todas las demás solicitudes
            }
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