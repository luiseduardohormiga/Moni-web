import { useState } from 'react'
import useConvocatorias from '../hooks/useConvocatorias'
import Alerta from './Alerta'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

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
  const { submitPostulacion } = useConvocatorias()
  const handleSubmit = async e => {
    e.preventDefault()

    if (!pdf) {
      Swal.fire({
        title: "tienes que subir tu hoja de vida para postularte",
        confirmButtonColor: "#a93800"
      });
    } else {
      try {
        await submitPostulacion({ pdf, convocatoria: params.id })
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "postulacion subida correctamente",
          showConfirmButton: false,
          timer: 1500
        });
        setPdf(null)
        setTimeout(() => {
          setError('')
          navigate('/convocatorias')
        }, 2000)
      } catch (error) {
        Swal.fire({
          title: error.message,
          confirmButtonColor: "#a93800"
        });
      }
    }
  }
  return (
    <div>
      <form encType="multipart/form-data" onSubmit={handleSubmit} className="my-10">
        <div className="mb-5">
          <h1 className='text-center font-bold text-2xl uppercase'>Sube tu hoja de vida</h1>
          {error && <Alerta alerta={{ msg: error, error: true }} />}
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
          style={{ background: '#39A900', transition: 'background-color 0.3s' }}
          onMouseEnter={(e) => e.target.style.background = '#2F7B00'}
          onMouseLeave={(e) => e.target.style.background = '#39A900'}
          value={'Postularse'}
        />
      </form>
    </div>
  )
}

export default FormularioPostulacion
