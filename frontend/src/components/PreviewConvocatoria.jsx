import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewConvocatoria = ({convocatoria}) => {
  const { auth } = useAuth()
  const { titulo, _id, descripcion, img } = convocatoria

  return (
    <>
      <div className="border-b p-5 flex">
          <div className="flex mr-7 m-5">
              {convocatoria.img && <img src={img.url} alt="imagen"/>}
              <div className="ml-10 mr-60 text-center">
                <h1 className="uppercase font-bold">{titulo}</h1>
                <h2 className="uppercase">Requisitos a cumplir:</h2>
                <span className="text-sm text-gray-500 uppercase">{' '}
                  {descripcion}
                </span>
              </div>
          </div>
          <div>
            {auth.rol === 'admin'?
              <Link
              to={`${_id}`} 
              className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold"
              >Ingresar</Link>
            : auth.rol === 'instructor'?
              <Link
              to={`${_id}`} 
              className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold"
              >Ingresar</Link>
            : auth.rol === 'psicologo'?
              <Link
              to={`${_id}`} 
              className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold"
              >Ingresar</Link>
            : 
            <Link to={`${_id}`} className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold"
            >Postularse</Link>
            }
          </div>
          
            
      </div>
    </>
  )
}

export default PreviewConvocatoria
