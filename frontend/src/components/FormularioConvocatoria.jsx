import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useConvocatorias from "../hooks/useConvocatorias"
import Alerta from "./Alerta"
import Swal from 'sweetalert2';

const FormularioConvocatoria = () => {
    const [id, setId] = useState(null)
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [img, setImg] = useState(null)
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFinalizacion, setFechaFinalizacion] = useState('')
    const [imagenPreview, setImagenPreview] = useState(null)

    const params = useParams()

    const handleImagenChange = (e) => {
        const nuevaImagen = e.target.files[0];
        // Actualizar el estado de la imagen para enviar al servidor
        setImg(nuevaImagen);
        // Crear una URL de objeto para la previsualización
        const nuevaImagenPreview = URL.createObjectURL(nuevaImagen);
        setImagenPreview(nuevaImagenPreview);
    };

    const { mostrarAlerta, alerta, submitConvocatoria, convocatoria } = useConvocatorias()
    useEffect(() => {
        if (params.id) {
            setId(convocatoria._id)
            setTitulo(convocatoria.titulo)
            setDescripcion(convocatoria.descripcion)
            setImg(convocatoria.img)
            setFechaInicio(convocatoria.fechaInicio?.split('T')[0])
            setFechaFinalizacion(convocatoria.fechaFinalizacion?.split('T')[0])
            if (convocatoria.img) {
                setImagenPreview(convocatoria.img.url); // Establecer la URL de la imagen para mostrar la vista previa
            }
        }
    }, [params])


    const handleSubmit = async e => {
        e.preventDefault()
        
        if (titulo.trim() === '') {
            Swal.fire({
                title: "La convocatoria necesita un titulo!",
                confirmButtonColor: "#39A900"});
            return;
        }
        if ([titulo, descripcion, img, fechaInicio, fechaFinalizacion].includes('')) {
            Swal.fire({
                title: "Todos los campos son obligatorios",
                confirmButtonColor: "#39A900"
              });
            return
        }

        //pasar al provider
        await submitConvocatoria({ id, titulo, descripcion, img, fechaInicio, fechaFinalizacion })
        setId('')
        setTitulo('')
        setDescripcion('')
        setImg(null)
        setFechaInicio('')
        setFechaFinalizacion('')

        //console.log(convocatoria)
    }
    const { msg } = alerta
    return (
        <form encType="multipart/form-data" className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
            {msg && <Alerta alerta={alerta} />}

            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="nombre"
                >Titulo convocatoria</label>
                <input
                    id="nombre"
                    type="text"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Convocatoria"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="descripcion"
                >Requisitos para el postulado</label>
                <textarea
                    id="descripcion"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripcion del convocatoria"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <div>
                    {imagenPreview && (
                        <img
                            src={imagenPreview}
                            alt="Previsualización de la imagen"
                            className="mt-2 rounded-md max-w-full"
                        />
                    )}
                </div>
                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="imagen">Imagen de Portada</label>
                <input
                    id="imagen"
                    type="file"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    onChange={handleImagenChange}
                    accept="image/*"
                />
            </div>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="fecha-Inicio"
                >fecha Inicio</label>
                <input
                    id="fecha-Inicio"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fechaInicio}
                    onChange={e => {
                        const selectDate = new Date(e.target.value);
                        const currenDate = new Date()
                        if (selectDate < currenDate) {
                            Swal.fire({
                                title: "La fecha de inicio no puede ser menor que la fecha actual",
                                confirmButtonColor: "#39A900"
                              });
                            setFechaInicio(currenDate.toISOString().slice(0, 10));
                            return;
                        }
                        setFechaInicio(e.target.value)
                    }}
                />
            </div>
            <div className="mb-5">
                <label
                    className="text-gray-700 uppercase font-bold text-sm"
                    htmlFor="fechaFinalizacion"
                >Fecha finalizacion</label>
                <input
                    id="fechaFinalizacion"
                    type="date"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fechaFinalizacion}
                    onChange={e => {
                        const fechaFinalizacion = e.target.value;
                        if (fechaFinalizacion <= fechaInicio) {
                            Swal.fire({
                                title: "La fecha de finalizacion no puede ser menor o igual a la decha de inicio",
                                confirmButtonColor: "#39A900"
                              });
                            setFechaFinalizacion('')
                            return;
                        }
                        setFechaFinalizacion(e.target.value)
                    }}
                />
            </div>

            <input type="submit" value={id ? 'Actualizar convocatoria' : 'Crear convocatoria'}
                className="w-full p-3 uppercase font-bold text-white rounded cursor-pointers" style={{background: '#39A900', transition: 'background-color 0.3s'}}
                onMouseEnter={(e) => e.target.style.background = '#2F7B00'}
                onMouseLeave={(e) => e.target.style.background = '#39A900'}
            />

        </form>
    )
}

export default FormularioConvocatoria
