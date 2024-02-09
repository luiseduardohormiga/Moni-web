import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewConvocatoria = ({convocatoria}) => {
  const { auth } = useAuth()
  const { titulo, _id, descripcion } = convocatoria

  return (
    <>
      <div className="border-b p-5 flex">
          <div className="flex-1 mr-7">
              <h1 className="uppercase">{titulo}</h1>
              <span className="text-sm text-gray-500 uppercase">{' '}
                {descripcion}
              </span>
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
            >Postularce</Link>
            }
          </div>
          
            
      </div>
    </>
  )
}

export default PreviewConvocatoria
