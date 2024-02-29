import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const ConvocatoriasContext = createContext()

const ConvocatoriasProvider = ({ children }) => {
    const [convocatorias, setConvocatorias] = useState([])
    const [alerta, setAlerta] = useState({})
    const [convocatoria, setConvocatoria] = useState({})
    const [cargando, setCargando] = useState(false)
    const [postulaciones, setPostulaciones] = useState([])
    const [postulado, setPostulado] = useState({})


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


    const mostrarAlerta = alerta => {
        setAlerta(alerta)
        setTimeout(() => {
            setAlerta({})
        }, 3000)
    }
    const submitConvocatoria = async convocatoria => {
        if (convocatoria.id) {
            await editarConvocatoria(convocatoria)
        } else {
            await nuevaConvocatoria(convocatoria)
        }
        return
    }

    const editarConvocatoria = async convocatoria => {
        const token = localStorage.getItem('token')
        try {
            if (!token) return

            const formData = new FormData();
            formData.append('titulo', convocatoria.titulo);
            formData.append('descripcion', convocatoria.descripcion);
            formData.append('fechaInicio', convocatoria.fechaInicio);
            formData.append('fechaFinalizacion', convocatoria.fechaFinalizacion);
            if (convocatoria.img) {
                formData.append('img', convocatoria.img);
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/convocatorias/${convocatoria.id}`, formData, config);
            // sincronizar el state
            const convocatoriaActualizada = convocatorias.map(convocatoriaState => convocatoriaState._id === data._id ? data : convocatoriaState)
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
            }, 500)
        } catch (error) {
            console.log(error)
        }
    }
    const nuevaConvocatoria = async convocatoria => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            const form = new FormData()
            for (let key in convocatoria) {
                form.append(key, convocatoria[key])
            }
            const config = {
                headers: {
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

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Convocatoria creada correctamente",
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                setAlerta({})
                navigate('/convocatorias')
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }
    const obtenerConvocatoria = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios(`/convocatorias/${id}`, config)
            setConvocatoria(data)
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
    }
    const eliminarConvocatoria = async id => {
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.delete(`/convocatorias/${id}`, config)
            setConvocatoria(data)
            //sincronizar 
            const convocatoriaActualizada = convocatorias.filter(convocatoriaState => convocatoriaState._id !== id)
            setConvocatorias(convocatoriaActualizada)
            setTimeout(() => {
                setAlerta({})
                navigate('/convocatorias')
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    const submitPostulacion = async postulacion => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const form = new FormData();
            for (let key in postulacion) {
                form.append(key, postulacion[key]);
            }

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await clienteAxios.post('/postulaciones', form, config);
            setPostulaciones([...postulaciones, data]);
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Te has postulado correctamente",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            if (error.response && error.response.data && error.response.data.msg) {
                throw new Error(error.response.data.msg); // Devolver el mensaje de error del servidor

            } else {
                throw new Error("Error al crear el usuario");
            }

        }
    };
    const obtenerPostulacion = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios(`/postulaciones/${id}`, config)
            // Obtener el nombre del usuario postulado
            const usuarioId = data.Postulado;
            const usuarioResponse = await clienteAxios(`/usuarios/${usuarioId}`, config);
            const nombreUsuario = usuarioResponse.data.nombre;

            // Agregar el nombre del usuario al objeto de datos de la postulación
            const datosPostulacion = { ...data, nombreUsuario };

            setPostulado(datosPostulacion)
            //console.log(datosPostulacion)
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
    }
    const calificarPostulado = async postulado => {
        setCargando(true)
        const token = localStorage.getItem('token')
        try {
           
            if (!token) return
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/postulaciones/${postulado.id}`, postulado, config);
            const calificionCompletada = postulaciones.map(postulacionState => postulacionState._id ===  data._id ? data : postulacionState)
                setPostulado( calificionCompletada)
                //alerta
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "calificacion guardada",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    navigate(`/convocatorias`)
                }, 2000)
            setPostulado(data)
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
    }
    return (
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
                submitPostulacion,
                postulado,
                obtenerPostulacion,
                calificarPostulado,
            }}
        >{children}
        </ConvocatoriasContext.Provider>
    )
}
export {
    ConvocatoriasProvider
}
export default ConvocatoriasContext