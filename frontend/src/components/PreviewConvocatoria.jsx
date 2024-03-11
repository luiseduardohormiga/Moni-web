import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewConvocatoria = ({convocatoria}) => {
  const { auth } = useAuth()
  const { titulo, _id, descripcion } = convocatoria

  return (
    <>
    <div className="lg:flex xl:flex m-5 mb-10 border-b md:p-3">
          {convocatoria.img && <img src={convocatoria.img.url} alt="imagen" style={{ width: '100%', maxHeight: '300px' }} />}
          <div className="md:ml-3 md:mr-10 text-center">
                <h1 className="uppercase font-bold mt-5">{titulo}</h1>
                <h2 className="uppercase font-bold mt-3">Requisitos a cumplir:</h2>
                <span className="text-sm text-gray-500  mt-5">{' '}
                  {descripcion}
                </span>
              </div>
              <div className="text-center mt-3 md:mt-0">
            {auth.rol === 'admin'?
              <Link
              to={`${_id}`} 
              className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold p-2 rounded-lg"
              style={{ color: '#39A900'}}
              >Ingresar</Link>
            : auth.rol === 'instructor'?
              <Link
              to={`${_id}`} 
              className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold 0 p-2 rounded-lg"
              style={{ color: '#39A900'}}
              >Ingresar</Link>
            : auth.rol === 'psicologo'?
              <Link
              to={`${_id}`} 
              className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold p-2 rounded-lg"
              style={{ color: '#39A900'}}
              >Ingresar</Link>
            : 
            <Link to={`${_id}`} className="text-gray-500 hover:text-gray-800 uppercase text-sm font-bold p-2 rounded-lg"
            style={{ color: '#39A900'}}
            >Postularse</Link>
            }
          </div>
      </div>
    </>
  )
}

export default PreviewConvocatoria
