import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewConvocatoria = ({convocatoria}) => {
  const { auth } = useAuth()
  const { titulo, _id, descripcion, img } = convocatoria

  return (
    <>
    <div className="md:flex m-5 mb-10 border-b p-3">
          {convocatoria.img && <img src={img.url} alt="imagen" style={{ width: '100%' }} />}
          <div className="md:ml-5 md:mr-10 text-center">
                <h1 className="uppercase font-bold mt-5">{titulo}</h1>
                <h2 className="uppercase mt-3">Requisitos a cumplir:</h2>
                <span className="text-sm text-gray-500 uppercase mt-5">{' '}
                  {descripcion}
                </span>
              </div>
              <div className="text-center mt-3 md:mt-0">
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
