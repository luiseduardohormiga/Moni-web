import { useState } from 'react'
import useConvocatorias from '../hooks/useConvocatorias'
import Alerta from './Alerta'
import { useParams, useNavigate } from 'react-router-dom'

const FormularioPostulacion = () => {
    const [pdf, setPdf] = useState(null)
    const params = useParams()
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleFileChange = (e) => {
      const nuevoArchivo = e.target.files[0];
      setPdf(nuevoArchivo)
      //console.log(nuevoArchivo)
    }

    const {mostrarAlerta, submitPostulacion} = useConvocatorias()
    const handleSubmit = async e => {
        e.preventDefault()

        if (!pdf) {
          setError('El campo es obligatorio');
          return setTimeout(() => {
            setError('')
          },2000)
        }
        try {
          await submitPostulacion({ pdf, convocatoria: params.id })
          mostrarAlerta({
            msg: 'postulacion subida correctamente',
            error: false,
          })
          setPdf(null)
          setTimeout(() => {
            setError('')
            navigate('/convocatorias')
        },2000)
        } catch (error) {
          setError(error.message)
          setTimeout(() => {
            setError('')
            navigate('/convocatorias')
        },2000)
        }
        
      }

  return (
    <div>
        <form encType="multipart/form-data" onSubmit={handleSubmit} className="my-10">
            <div className="mb-5">
            <h1 className='text-center font-bold text-2xl uppercase'>Sube tu hoja de vida</h1>
            {error && <Alerta alerta={{msg: error, error: true}}/>}
            <input 
                type="file" 
                id='pdf'
                className='border-2 w-full p-2 mt-10 bg-gray-300 placeholder-gray-400 rounded-md'
                accept="application/pdf"
                onChange={handleFileChange}
            />
            </div>
            
            <input type="submit"
            className="w-full p-3 text-white uppercase text-sm font-bold cursor-pointer transition-colors rounded"
            style={{background: '#39A900', transition: 'background-color 0.3s'}}
                onMouseEnter={(e) => e.target.style.background = '#2F7B00'}
                onMouseLeave={(e) => e.target.style.background = '#39A900'}
            value={'Postularse'}
            />
        </form>
    </div>
  )
}

export default FormularioPostulacion
