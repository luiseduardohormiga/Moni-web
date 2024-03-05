import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useConvocatorias from "../hooks/useConvocatorias"
import useAuth from "../hooks/useAuth"
import PreviewPostulado from "../components/PreviewPostulado"
import FormularioPostulacion from "../components/FormularioPostulacion"

const Convocatoria = () => {
  const { obtenerConvocatoria, convocatoria, cargando } = useConvocatorias()
  const { auth } = useAuth()
  const params = useParams()
  useEffect(() => {
    obtenerConvocatoria(params.id )
  }, [params.id])
  const { titulo, descripcion, fechaInicio, fechaFinalizacion } = convocatoria
  //console.log(convocatoria)

  if (cargando) return 'cargando...'
  return (
    <>
      <div className='flex justify-between gap-2'>
        <h1 className='font-black text-2xl'>{titulo}</h1>

        
      </div>
      {auth.rol === 'Aprendiz' ?
        <div className="bg-white p-10 mt-10">
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
          <div className="bg-gray-200 mt-10 p-10">
            <FormularioPostulacion />
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
          <div className="bg-white shadow mt-10 rounded-lg">
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
