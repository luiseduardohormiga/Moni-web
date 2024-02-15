import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useConvocatorias from '../hooks/useConvocatorias'
import Alerta from './Alerta'
import { useParams } from 'react-router-dom'

const FormularioPostulacion = () => {
    const [archivoPDF, setArchivoPDF] = useState('')
    const params = useParams()

    const { mostrarAlerta, alerta, submitPostulacion} = useConvocatorias()

    const handleSubmit = e => {
        e.preventDefault()
        if ([archivoPDF].includes('')) {
          mostrarAlerta({
            msg: 'campo obligatorio',
            error: true,
          })
          return
        }
        submitPostulacion({archivoPDF, convocatoria: params.id})
        mostrarAlerta({
          msg: 'postulacion subida correctamente',
          error: false,
        })
      }

      const { msg } = alerta

  return (
    <div>
        <form 
            onSubmit={handleSubmit}
            className="my-10">
            <div className="mb-5">
            <h1 className='text-center font-bold text-2xl uppercase'>Sube tu hoja de vida</h1>
            {msg && <Alerta alerta={alerta}/>}
            <input 
                type="file" 
                id='archivoPDF'
                className='border-2 w-full p-2 mt-10 bg-gray-300 placeholder-gray-400 rounded-md'
                accept="application/pdf"
                onChange={e => setArchivoPDF(e.target.value)}
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
