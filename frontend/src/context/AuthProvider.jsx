import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [usuarios, setUsuarios] = useState([])
    const [alerta, setAlerta] = useState({})
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(true)
    const [usuario, setUsuario] = useState({})  

    const navigate = useNavigate()

    useEffect(() => {
        const obtenerUsuarios = async (state) => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return
                    const config ={
                        headers:{
                            "Content-Type": "aplication/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                    const { data } = await clienteAxios('/usuarios', config)
                    setUsuarios(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerUsuarios()
    })

    const  mostrarAlerta = alerta => {
        setAlerta(alerta)
        setTimeout(() =>{
            setAlerta({})
        }, 3000)
    }

    useEffect(() => { 
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setCargando(false)
                return
            }
            const config ={
                headers:{
                    "Content-Type": "aplication/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios('/usuarios/perfil', config)
                setAuth(data)
            } catch (error) {
                setAuth({})
            }
            setCargando(false)
            
        }   
        autenticarUsuario()
    }, []);

    const logout = () => {
        setAuth({})
        localStorage.clear()
    }

    const submitUsuario = async usuario => {
        if (usuario.id) {
           await editarUsuario(usuario)
        }else{
           await nuevoUsuario(usuario)
        }
    }
    const editarUsuario = async usuario => {
        const token = localStorage.getItem('token')
            try {
                if(!token) return
            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/usuarios/${usuario.id}`, usuario, config)
                console.log(data)

                // sincronizar el state
                const usuarioActualizado = usuarios.map(usuarioState => usuarioState._id ===  data._id ? data : usuarioState)
                setUsuario(usuarioActualizado)
                //alerta
                setAlerta({
                    msg: 'Usuario actualizado correctamente',
                    error: false
                })
                //redireccionar
                setTimeout(() => {
                    setAlerta({})
                    navigate('/usuarios')
                },2000)
           } catch (error) {
            console.log(error)
           }
    }
    const nuevoUsuario = async usuario => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/usuarios', usuario, config)
    
            setUsuarios([...usuarios, data])
            
            setAlerta({
                msg: 'usuarios creado correctamente',
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/usuarios')
            },2000)
        } catch (error) {
            console.log(error)
        }
       }
    
    

    const obtenerUsuario = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            const config ={
                headers:{
                    "Content-Type": "aplication/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios(`/usuarios/${id}`, config)
            setUsuario(data)
        } catch (error) {
            console.log(error)
        }

    }

    const eliminarUsuario = async id => {
        try {
            const token = localStorage.getItem('token')
            if(!token) return
            const config ={
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.delete(`/usuarios/${id}`, config)
            //sincronizar 
            const usuarioActualizado = usuarios.filter(usuarioState => usuarioState._id !== id)
            setUsuarios(usuarioActualizado)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setTimeout(() => {
                setAlerta({})
                navigate('/usuarios')
            },2000)
        } catch (error) {
            console.log(error)
        }
       }

    return(
        <AuthContext.Provider
            value={{
                usuarios,
                auth,
                setAuth,
                cargando,
                mostrarAlerta,
                alerta,
                obtenerUsuario,
                usuario,
                submitUsuario,
                logout,
                eliminarUsuario,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}

export default AuthContext