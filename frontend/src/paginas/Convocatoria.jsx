import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useConvocatorias from "../hooks/useConvocatorias"
import useAuth from "../hooks/useAuth"
import PreviewPostulado from "../components/PreviewPostulado"
import FormularioPostulacion from "../components/FormularioPostulacion"

const Convocatoria = () => {
  const { obtenerConvocatoria, convocatoria, cargando } = useConvocatorias()
  const { auth } = useAuth()
  const params = useParams()
  useEffect(() => {
    obtenerConvocatoria(params.id)
  }, [params.id])
  const { titulo, descripcion, fechaInicio, fechaFinalizacion, img } = convocatoria
  //console.log(convocatoria)

  if (cargando) return 'cargando...'
  return (
    <>
      <div className='flex justify-between gap-2'>
        <h1 className='font-black text-2xl'>{titulo}</h1>
        {auth.rol === 'admin' ? 
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            <Link
              to={`/convocatorias/editar/${params.id}`}
              className='uppercase font-bold'
            >editar
            </Link>
          </div>
        : 
        '' }
        

      </div>
      {auth.rol === 'Aprendiz' ?
        <div className="bg-white p-10 mt-10 flex">
          <div className="ml-10 flex-1">
            {convocatoria.img && <img src={img.url} alt="imagen" style={{ width: '100%', height: '100%' }} />}
          </div>
          <div className="flex-1">
            <h2 className="font-black text-2xl uppercase text-center mb-5">Requisitos de la convocatoria</h2>
            <p className="text-center">{descripcion}</p>
            <div className="flex justify-center mt-10">
              <div className="mr-20">
                <h2 className="font-black text-2xl uppercase">FECHA DE INICIO</h2>
                {fechaInicio}
              </div>
              <div>
                <h2 className="font-black text-2xl uppercase">FECHA DE FINALIZACION</h2>
                {fechaFinalizacion}
              </div>
            </div>
            <div className="bg-gray-200 mt-10 p-10 ml-10">
              <FormularioPostulacion />
            </div>
          </div>
        </div>

        :
        <div>
          <div className="border-b p-5 flex justify-center">
            <h1 className="font-black text-3xl capitalize  mt-10 flex-3">POSTULADOS A LA CONVOCATORIA</h1>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              className="border border-gray-300 p-2 rounded-md mb-4 ml-10 mt-10 flex-3"
            />

          </div>
          <div className="bg-white shadow mt-10 rounded-lg lg:w-2/3 mx-auto">
            {convocatoria.postulados?.length ?
              convocatoria.postulados?.map(postulado => (
                <PreviewPostulado
                  key={postulado._id}
                  postulado={postulado}
                />
              )) :
              <p className="text-center my-5 p-10">No hay Postulados en este momento</p>}
          </div>
        </div>
      }

    </>
  )
}

export default Convocatoria
