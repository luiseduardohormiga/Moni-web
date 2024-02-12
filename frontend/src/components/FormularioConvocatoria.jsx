import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useConvocatorias from "../hooks/useConvocatorias"
import Alerta from "./Alerta"


const FormularioConvocatoria = () => {
    const [id, setId] = useState(null)
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [img, setImg] = useState(null)
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFinalizacion, setFechaFinalizacion] = useState('')
            
    const params = useParams()
    
    const { mostrarAlerta, alerta, submitConvocatoria, convocatoria } = useConvocatorias()
    useEffect(() => {
        if (params.id) {
            setId(convocatoria._id)
            setTitulo(convocatoria.titulo)
            setDescripcion(convocatoria.descripcion)
            setImg(convocatoria.img)
            setFechaInicio(convocatoria.fechaInicio?.split('T')[0])
            setFechaFinalizacion(convocatoria.fechaFinalizacion?.split('T')[0])
        } 
    }, [params])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImg(file)
    }
    
    const handleSubmit = async e =>{
        e.preventDefault()
        if (titulo.trim() === '') {
            alert('La convocatoria necesita un Titulo');
            return;
          }
        if ([titulo, descripcion, img, fechaInicio, fechaFinalizacion ].includes('')) {
            mostrarAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }
    
        //pasar al provider
        await submitConvocatoria({ id, titulo, descripcion, img, fechaInicio, fechaFinalizacion, img})
        setId('')
        setTitulo('')
        setDescripcion('')
        setImg(null)
        setFechaInicio('')
        setFechaFinalizacion('')

        console.log(convocatoria)
    }
    const { msg } = alerta
  return (
    <form className="bg-white py-10 px-5 md:w-300 rounded-lg shadow" onSubmit={handleSubmit}>
        {msg && <Alerta alerta={alerta} />}
        
        <div className="mb-5">
            <label 
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="nombre"
            >Nombre convocatoria</label>
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
            >Descripcion</label>
            <textarea 
                id="descripcion"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                placeholder="Descripcion del convocatoria"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="imagen">Imagen de Portada</label>
            <input 
                id="imagen"
                type="file"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                onChange={e => setImg(e.target.files[0])} 
                accept="image/*"
                //value={img}
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
                    if (selectDate < currenDate){
                        alert('La fecha de inicio no puede ser menor que la fecha actual')
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
                        alert('La fecha de finalizacion no puede ser menor o igual a la decha de inicio')
                        setFechaFinalizacion('')
                        return;
                    }
                    setFechaFinalizacion(e.target.value)
                }}
            />
        </div>
      
      <input type="submit" value={id ? 'Actualizar convocatoria' : 'Crear convocatoria'} 
      className="bg-green-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-green-700 transition-colors" 
      />
    </form>
  )
}

export default FormularioConvocatoria
