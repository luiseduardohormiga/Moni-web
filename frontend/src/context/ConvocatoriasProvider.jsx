import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from 'react-router-dom'

const ConvocatoriasContext = createContext()

const ConvocatoriasProvider = ({children}) =>{
    const [convocatorias, setConvocatorias] = useState([])
    const [alerta, setAlerta] = useState({})
    const [convocatoria, setConvocatoria] = useState({})
    const [cargando, setCargando] = useState(false)


    const navigate = useNavigate()

    useEffect(() => {
        const obtenerConvocatorias = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = token ? {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                } : {};
    
                const { data } = await clienteAxios.get('/convocatorias', config);
                setConvocatorias(data);
            } catch (error) {
                console.log(error);
            }
        }
    
        obtenerConvocatorias();
    }, []);

    
    const  mostrarAlerta = alerta => {
        setAlerta(alerta)
        setTimeout(() =>{
            setAlerta({})
        }, 3000)
    }
    const submitConvocatoria = async convocatoria => {
        if (convocatoria.id) {
            await editarConvocatoria(convocatoria)
        }else{
            await nuevaConvocatoria(convocatoria)
        }
        return
   }

   const editarConvocatoria = async convocatoria => {
    const token = localStorage.getItem('token')
        try {
            if(!token) return
        const config ={
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await clienteAxios.put(`/convocatorias/${convocatoria.id}`, convocatoria, config)
        // sincronizar el state
        const convocatoriaActualizada = convocatorias.map(convocatoriaState => convocatoriaState._id ===  data._id ? data : convocatoriaState)
        setConvocatoria(convocatoriaActualizada)
        //alerta
        setAlerta({
            msg: 'Convocatoria actualizada correctamente',
            error: false
        })
        //redireccionar
        setTimeout(() => {
            setAlerta({})
            navigate('/convocatorias')
            window.location.reload();
        },500)
        } catch (error) {
            console.log(error)
        }
   }
   const nuevaConvocatoria = async convocatoria => {
    try {
        const token = localStorage.getItem('token')
        if(!token) return
        const form = new FormData()
        for (let key in convocatoria){
            form.append(key, convocatoria[key])
        }
        const config ={
            headers:{
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }
        
        const { data } = await clienteAxios.post('/convocatorias', convocatoria, config, {
            headers: {
                "Content-Type": "Multipart/form-data"
            }
        })
        setConvocatorias([...convocatorias, data])
        
        setAlerta({
            msg: 'Convocatoria creada correctamente',
            error: false
        })
        setTimeout(() => {
            setAlerta({})
            navigate('/convocatorias')
        },2000)
    } catch (error) {
        console.log(error)
    }
   }
   const obtenerConvocatoria = async id =>{
    setCargando(true)
    try {
        const token = localStorage.getItem('token')
            if(!token) return
            const config ={
                headers:{
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios(`/convocatorias/${id}`, config)
            setConvocatoria(data)
    } catch (error) {
        console.log(error)
    }finally{
        setCargando(false)
    }
   }
   const eliminarConvocatoria = async id => {
    try {
        const token = localStorage.getItem('token')
        if(!token) return
        const config ={
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await clienteAxios.delete(`/convocatorias/${id}`, config)
        //sincronizar 
        const convocatoriaActualizada = convocatorias.filter(convocatoriaState => convocatoriaState._id !== id)
        setConvocatorias(convocatoriaActualizada)
        setAlerta({
            msg: data.msg,
            error: false
        })
        setTimeout(() => {
            setAlerta({})
            navigate('/convocatorias')
        },2000)
    } catch (error) {
        console.log(error)
    }
   }

   const submitPostulacion = async postulacion => {
    try {
        const token = localStorage.getItem('token')
        if(!token) return
        const config ={
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const { data } = await clienteAxios.post('/postulaciones', postulacion, config)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
   }
    return(
        <ConvocatoriasContext.Provider
            value={{
                convocatorias,
                mostrarAlerta,
                alerta,
                submitConvocatoria,
                obtenerConvocatoria,
                convocatoria,
                cargando,
                eliminarConvocatoria,
                submitPostulacion
            }}
        >{children}
        </ConvocatoriasContext.Provider>
    )
}
export {
    ConvocatoriasProvider
}
export default ConvocatoriasContext