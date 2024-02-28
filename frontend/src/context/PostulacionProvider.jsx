import { createContext,useState } from "react";
import clienteAxios from "../config/clienteAxios";

const PostulacionContext = createContext()

const PostulacionProvider = ({ children }) => {
    const [postulacion, setPostulacion] = useState({})

    const obtenerPostulacion = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios(`/postulado/calificar/${id}`, config)
            setPostulacion(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <PostulacionContext.Provider
        value={{
            
            obtenerPostulacion
        }}
        >{children}
        </PostulacionContext.Provider>
    )
}
export {
    PostulacionProvider
}
export default PostulacionContext