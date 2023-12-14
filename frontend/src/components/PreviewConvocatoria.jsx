import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewConvocatoria = ({convocatoria}) => {
  const { auth } = useAuth()
  const { titulo, _id, descripcion } = convocatoria

  return (
    <>
      <div className="border-b p-5 flex">
          <p className="flex-1">
              {titulo}

              <span className="text-sm text-gray-500 uppercase">{''}{descripcion}</span>
          </p>
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
    </>
  )
}

export default PreviewConvocatoria
