import { useState, useEffect } from 'react'
import useConvocatorias from '../hooks/useConvocatorias'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'

const FormularioPostulacion = () => {
    const [pdf, setPdf] = useState(null)
    const params = useParams()

    const handleFileChange = (e) => {
      const nuevoArchivo = e.target.files[0];
      setPdf(nuevoArchivo)
      console.log(nuevoArchivo)
    }

    const { mostrarAlerta, alerta, submitPostulacion} = useConvocatorias()
    const handleSubmit = async e => {
        e.preventDefault()

        if (!pdf) {
          mostrarAlerta({
            msg: 'El campo es obligatorio',
            error: true,
          });
          return;
        }
        await submitPostulacion({ pdf, convocatoria: params.id })
        setPdf(null)
        mostrarAlerta({
          msg: 'postulacion subida correctamente',
          error: false,
        })
      }

      const { msg } = alerta

  return (
    <div>
        <form encType="multipart/form-data" onSubmit={handleSubmit} className="my-10">
            <div className="mb-5">
            <h1 className='text-center font-bold text-2xl uppercase'>Sube tu hoja de vida</h1>
            {msg && <Alerta alerta={alerta}/>}
            <input 
                type="file" 
                id='pdf'
                className='border-2 w-full p-2 mt-10 bg-gray-300 placeholder-gray-400 rounded-md'
                accept="application/pdf"
                onChange={handleFileChange}
            />
            </div>
            <input type="submit"
            className="bg-green-600 hover:bg-green-700 w-full p-3 text-white uppercase text-sm font-bold cursor-pointer transition-colors rounded"
            value={'Postularse'}
            />
        </form>
    </div>
  )
}

export default FormularioPostulacion
